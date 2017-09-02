from datetime import datetime

import pytz

from utils.utils import import_presentation, export_video


def update_course_status_phase(sender, instance, **kwargs):
    from scholars.courses.models import Course
    if sender == Course and instance.id is not None:

        # IMPORTANT
        # ALL VALIDATIONS SHOULD HAPPEN BEFORE THIS STEP
        # THIS SHOULD ONLY CHECK IF SWITCH FOR NEXT PHASE IS VALID

        changed_fields = instance.tracker.changed()

        if 'phase' in changed_fields and instance.phase == changed_fields['phase'] + 1:
            options = {
                Course.PHASE.onboarding: start_reading,
                Course.PHASE.reading: start_discussion,
                Course.PHASE.discussion: start_slides,
                Course.PHASE.slides: start_peer_review,
                Course.PHASE.peer_review: start_audio,
                Course.PHASE.audio: start_refine,
                Course.PHASE.refine: start_pending_approval,
            }

            if instance.status == Course.STATUS.in_progress:
                options[changed_fields['phase']](instance)


def start_reading(instance):
    from scholars.courses.models import Course

    instance.in_progress_at = datetime.now(pytz.utc)
    instance.make_in_progress()

    # extra steps


def start_discussion(instance):
    from scholars.courses.models import Course

    # completed
    instance.reading_at = datetime.now(pytz.utc)

    # extra steps


def start_slides(instance):
    from scholars.courses.models import Course

    # completed
    instance.discussion_at = datetime.now(pytz.utc)

    # extra steps


def start_peer_review(instance):
    from scholars.courses.models import Course

    # completed
    instance.slides_at = datetime.now(pytz.utc)

    # extra steps
    # moving to peer review => create presentation for feedback on each slide
    if instance.id is not None and instance.gid is not None:
        error = import_presentation(instance.id, instance.gid)
        # todo send error to sentry

        print error


def start_audio(instance):
    from scholars.courses.models import Course

    # completed
    instance.peer_review_at = datetime.now(pytz.utc)

    # extra steps
    # moving to audio stage => create presentation
    if instance.id is not None and instance.gid is not None:
        error = import_presentation(instance.id, instance.gid)
        # todo send error to sentry

        print error


def start_refine(instance):
    from scholars.courses.models import Course

    # completed
    instance.audio_at = datetime.now(pytz.utc)

    # extra steps


def start_pending_approval(instance):
    from scholars.courses.models import Course

    # completed
    instance.refine_at = datetime.now(pytz.utc)

    # extra steps
    # moving to approval stage => create video
    if instance.id is not None and instance.gid is not None:
        export_video(instance.id)



def update_course_counters(sender, instance, **kwargs):
    from scholars.courses.models import CourseMember
    if sender == CourseMember and instance.id is not None:
        # todo concurrency
        if instance.presentation:
            instance.course.num_presentation_actual = instance.course.num_presentation_actual - 1
        if instance.graphics:
            instance.course.num_graphics_actual = instance.course.num_graphics_actual - 1
        if instance.scripting:
            instance.course.num_scripting_actual = instance.course.num_scripting_actual - 1
        if instance.audio:
            instance.course.num_audio_actual = instance.course.num_audio_actual - 1
        if instance.dri:
            instance.course.num_dri_actual = instance.course.num_dri_actual - 1
        instance.course.save()
