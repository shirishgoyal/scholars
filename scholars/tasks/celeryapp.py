from __future__ import absolute_import, unicode_literals

import os

from celery import Celery
from django.apps import apps, AppConfig
from django.conf import settings


if not settings.configured:
    # set the default Django settings module for the 'celery' program.
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.local')  # pragma: no cover

app = Celery('scholars.tasks', broker=settings.CELERY_BROKER_URL)


class CeleryConfig(AppConfig):
    name = 'config'
    verbose_name = 'Celery Config'

    def ready(self):
        # Using a string here means the worker will not have to
        # pickle the object when using Windows.
        app.config_from_object('django.conf:settings', namespace='CELERY')
        installed_apps = [app_config.name for app_config in apps.get_app_configs()]
        app.autodiscover_tasks(lambda: installed_apps, force=True)

        if hasattr(settings, 'RAVEN_CONFIG'):
            # Celery signal registration
            # Since raven is required in production only,
            # imports might (most surely will) be wiped out
            # during PyCharm code clean up started
            # in other environments.
            # @formatter:off
            from raven import Client as RavenClient
            from raven.contrib.celery import register_signal as raven_register_signal
            from raven.contrib.celery import register_logger_signal as raven_register_logger_signal
            # @formatter:on

            raven_client = RavenClient(dsn=settings.RAVEN_CONFIG['dsn'])
            raven_register_logger_signal(raven_client)
            raven_register_signal(raven_client)

        if hasattr(settings, 'OPBEAT'):
            # Since opbeat is required in production only,
            # imports might (most surely will) be wiped out
            # during PyCharm code clean up started
            # in other environments.
            # @formatter:off
            from opbeat.contrib.django.models import client as opbeat_client
            from opbeat.contrib.django.models import logger as opbeat_logger
            from opbeat.contrib.django.models import register_handlers as opbeat_register_handlers
            from opbeat.contrib.celery import register_signal as opbeat_register_signal

            # @formatter:on
            try:
                opbeat_register_signal(opbeat_client)
            except Exception as e:
                opbeat_logger.exception('Failed installing celery hook: %s' % e)

            if 'opbeat.contrib.django' in settings.INSTALLED_APPS:
                opbeat_register_handlers()

        app.conf.beat_schedule = {
            'check-every-1-hour': {
                'task': 'approve_proposed_talks',
                'schedule': 60 * 60
            },
        }


@app.task(bind=True)
def debug_task(self):
    print('Request: {0!r}'.format(self.request))  # pragma: no cover


# https://stackoverflow.com/questions/24101524/finding-median-of-list-in-python
def median(lst):
    n = len(lst)
    if n < 1:
        return None
    if n % 2 == 1:
        return sorted(lst)[n // 2]
    else:
        return sum(sorted(lst)[n // 2 - 1:n // 2 + 1]) / 2.0


def calculate_time_distance_median(course, member):
    import pytz
    from datetime import datetime

    all_members = course.members
    now = datetime.now()

    time_differences = []
    for other_member in all_members:
        elapsed = pytz.timezone(other_member.timezone).utcoffset(now) - pytz.timezone(member.timezone).utcoffset(now)
        total = abs(elapsed.total_seconds())
        time_differences.append(total)

    return median(time_differences)


@app.task(ignore_result=True)
def approve_proposed_talks(self):
    from django.db import transaction
    from scholars.courses.models import Course, CourseMember

    courses = Course.requirements.meets_requirements_for_in_progress()
    in_progress = Course.requirements.in_progress().count()

    allowed_count = 10 - in_progress

    if allowed_count > 0:
        allowed_courses = courses[:allowed_count]

        for course in allowed_courses:

            # fail together
            with transaction.atomic():
                # find DRIs
                dri_applied = CourseMember.objects.filter(course=course, dri=True)

                if dri_applied.count() == course.num_dri:
                    # make them default DRIs
                    for member in dri_applied:
                        member.is_dri = True
                        member.save()
                else:
                    # figure out best ones
                    # maximum (time commitment) * max(expertise) / least(time zone distance)
                    eligible = []
                    for member in dri_applied:
                        median_time_diff = calculate_time_distance_median(course, member)
                        if median_time_diff == 0:
                            median_time_diff = 0.000001

                        eligible.append({
                            'member': member,
                            'time_commitment': member.time_commitment,
                            'expertise': member.expertise,
                            'median_time_distance': median_time_diff,
                            'score': member.time_commitment * member.expertise / median_time_diff
                        })

                    most_eligible = sorted(eligible, key=lambda k: k['score'], reverse=True)[:course.num_dri]

                    for selected in most_eligible:
                        selected.is_dri = True
                        selected.save()

                # turn course to in progress
                course.status = Course.STATUS.in_progress
                course.save()
