import pytz
from datetime import datetime

from django.db import transaction

from courses.models import Course, CourseMember
from scholars.tasks.celeryapp import app


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
    all_members = course.members
    now = datetime.now()

    time_differences = []
    for other_member in all_members:
        elapsed = pytz.timezone(other_member.timezone).utcoffset(now) - pytz.timezone(member.timezone).utcoffset(now)
        total = abs(elapsed.total_seconds())
        time_differences.append(total)

    return median(time_differences)


@app.task(bind=True, ignore_result=True)
def approve_proposed_talks(self):
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
