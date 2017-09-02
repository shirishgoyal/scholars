import os

import pytz
from datetime import tzinfo, timedelta, datetime
from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models
from django.db.models import F, Count, ExpressionWrapper, DateField, DateTimeField
from django.db.models.signals import pre_delete, post_save, pre_save
from django.utils.translation import gettext_noop
from model_utils import Choices, FieldTracker

from scholars.courses.signals import update_course_counters, update_course_status_phase
from scholars.users.models import User
from scholars.utils.models import TimeStampable
from scholars.utils.utils import clear_folder
from scholars.utils.utils import import_presentation, send_manually_exception_email, copy_file, writable_permissions
from scholars.utils.slack import Slack


def get_image_path(instance, filename):
    import os
    full_name = os.path.join(
        "%d" % instance.course.id, "images", "%03d.png" % instance.position)
    media_path = os.path.join(settings.MEDIA_ROOT, full_name)
    # if os.path.exists(media_path):
    #     return os.path.join(settings.MEDIA_URL, full_name)
    return full_name


def get_audio_path(instance, filename):
    import os
    full_name = os.path.join(
        "%d" % instance.course.id, "audio", "%03d.mp3" % instance.position)
    media_path = os.path.join(settings.MEDIA_ROOT, full_name)
    # if os.path.exists(media_path):
    #     return os.path.join(settings.MEDIA_URL, full_name)
    return full_name


def get_video_path(id):
    import os
    full_name = os.path.join(
        "%d" % id, "videos", "video.mp4")
    media_path = os.path.join(settings.MEDIA_ROOT, full_name)

    if os.path.exists(media_path):
        return os.path.join(settings.MEDIA_URL, full_name)
    return None


class Category(TimeStampable):
    name = models.CharField(max_length=2048, unique=True)
    shortcode = models.CharField(max_length=8, null=True, blank=True)

    class Meta:
        verbose_name_plural = "categories"

    def __unicode__(self):
        return "%s" % self.name

    def __str__(self):
        return "%s" % self.name


class CourseQuerySet(models.QuerySet):
    def in_progress(self):
        return self.filter(
            status=Course.STATUS.in_progress
        )

    def include_members_needed(self):
        return self.select_related().annotate(
            presentation_needed=F('num_presentation') - F('num_presentation_actual'),
            graphics_needed=F('num_graphics') - F('num_graphics_actual'),
            scripting_needed=F('num_scripting') - F('num_scripting_actual'),
            audio_needed=F('num_audio') - F('num_audio_actual'),
            dri_needed=F('num_dri') - F('num_dri_actual'),
            members_count=Count('members'),
            min_date=ExpressionWrapper(F('created_at') + timedelta(days=7), output_field=DateTimeField())
        )

    def meets_requirements_for_in_progress(self):
        return self.include_members_needed().filter(
            status=Course.STATUS.proposed,
            min_date__lt=datetime.now(pytz.timezone('UTC')),
            presentation_needed__lte=0,
            graphics_needed__lte=0,
            scripting_needed__lte=0,
            audio_needed__lte=0,
            dri_needed__lte=0,
            members_count__gte=10
        ).order_by('-members_count')


class Course(TimeStampable):
    STATUS = Choices(
        (0, 'proposed', 'Proposed'),
        (1, 'in_progress', 'In Progress'),
        (2, 'published', 'Published')
    )

    PHASE = Choices(
        (0, 'onboarding', 'Onboarding'),
        (1, 'reading', 'Reading'),
        (2, 'discussion', 'Discussion'),
        (3, 'slides', 'Slides'),
        (4, 'peer_review', 'Peer Review'),
        (5, 'audio', 'Audio'),
        (6, 'refine', 'Refinement'),
        (7, 'pending_approval', 'Pending Approval'),
    )

    LANGUAGE = Choices(
        ('xx', 'xx', gettext_noop('Unknown')),
        ('af', 'af', gettext_noop('Afrikaans')),
        ('ar', 'ar', gettext_noop('Arabic')),
        ('ast', 'ast', gettext_noop('Asturian')),
        ('az', 'az', gettext_noop('Azerbaijani')),
        ('bg', 'bg', gettext_noop('Bulgarian')),
        ('be', 'be', gettext_noop('Belarusian')),
        ('bn', 'bn', gettext_noop('Bengali')),
        ('br', 'br', gettext_noop('Breton')),
        ('bs', 'bs', gettext_noop('Bosnian')),
        ('ca', 'ca', gettext_noop('Catalan')),
        ('cs', 'cs', gettext_noop('Czech')),
        ('cy', 'cy', gettext_noop('Welsh')),
        ('da', 'da', gettext_noop('Danish')),
        ('de', 'de', gettext_noop('German')),
        ('el', 'el', gettext_noop('Greek')),
        ('en', 'en', gettext_noop('English')),
        ('eo', 'eo', gettext_noop('Esperanto')),
        ('es', 'es', gettext_noop('Spanish')),
        ('et', 'et', gettext_noop('Estonian')),
        ('eu', 'eu', gettext_noop('Basque')),
        ('fa', 'fa', gettext_noop('Persian')),
        ('fi', 'fi', gettext_noop('Finnish')),
        ('fil', 'fil', gettext_noop('Filipino')),
        ('fr', 'fr', gettext_noop('French')),
        ('fy', 'fy', gettext_noop('Frisian')),
        ('ga', 'ga', gettext_noop('Irish')),
        ('gd', 'gd', gettext_noop('Scottish Gaelic')),
        ('gl', 'gl', gettext_noop('Galician')),
        ('he', 'he', gettext_noop('Hebrew')),
        ('hi', 'hi', gettext_noop('Hindi')),
        ('hr', 'hr', gettext_noop('Croatian')),
        ('hu', 'hu', gettext_noop('Hungarian')),
        ('ia', 'ia', gettext_noop('Interlingua')),
        ('id', 'id', gettext_noop('Indonesian')),
        ('io', 'io', gettext_noop('Ido')),
        ('is', 'is', gettext_noop('Icelandic')),
        ('it', 'it', gettext_noop('Italian')),
        ('ja', 'ja', gettext_noop('Japanese')),
        ('ka', 'ka', gettext_noop('Georgian')),
        ('kk', 'kk', gettext_noop('Kazakh')),
        ('km', 'km', gettext_noop('Khmer')),
        ('kn', 'kn', gettext_noop('Kannada')),
        ('ko', 'ko', gettext_noop('Korean')),
        ('lb', 'lb', gettext_noop('Luxembourgish')),
        ('lt', 'lt', gettext_noop('Lithuanian')),
        ('lv', 'lv', gettext_noop('Latvian')),
        ('mk', 'mk', gettext_noop('Macedonian')),
        ('ml', 'ml', gettext_noop('Malayalam')),
        ('mn', 'mn', gettext_noop('Mongolian')),
        ('mr', 'mr', gettext_noop('Marathi')),
        ('my', 'my', gettext_noop('Burmese')),
        ('nb', 'nb', gettext_noop('Norwegian Bokmal')),
        ('ne', 'ne', gettext_noop('Nepali')),
        ('nl', 'nl', gettext_noop('Dutch')),
        ('nn', 'nn', gettext_noop('Norwegian Nynorsk')),
        ('or', 'or', gettext_noop('Odia')),
        ('os', 'os', gettext_noop('Ossetic')),
        ('pa', 'pa', gettext_noop('Punjabi')),
        ('pl', 'pl', gettext_noop('Polish')),
        ('pt', 'pt', gettext_noop('Portuguese')),
        ('ro', 'ro', gettext_noop('Romanian')),
        ('ru', 'ru', gettext_noop('Russian')),
        ('sk', 'sk', gettext_noop('Slovak')),
        ('sl', 'sl', gettext_noop('Slovenian')),
        ('sq', 'sq', gettext_noop('Albanian')),
        ('sr', 'sr', gettext_noop('Serbian')),
        ('sv', 'sv', gettext_noop('Swedish')),
        ('sw', 'sw', gettext_noop('Swahili')),
        ('ta', 'ta', gettext_noop('Tamil')),
        ('te', 'te', gettext_noop('Telugu')),
        ('th', 'th', gettext_noop('Thai')),
        ('tr', 'tr', gettext_noop('Turkish')),
        ('tt', 'tt', gettext_noop('Tatar')),
        ('udm', 'udm', gettext_noop('Udmurt')),
        ('uk', 'uk', gettext_noop('Ukrainian')),
        ('ur', 'ur', gettext_noop('Urdu')),
        ('vi', 'vi', gettext_noop('Vietnamese')),
        ('zh', 'zh', gettext_noop('Mandarin')),
        ('zho', 'zho', gettext_noop('Chinese')),
    )

    doi = models.CharField(max_length=256, null=True, blank=True)

    parent = models.ForeignKey('self', null=True, blank=True, related_name="variants")
    version = models.PositiveIntegerField(default=1)
    lang = models.CharField(max_length=8, choices=LANGUAGE, default='en')

    name = models.CharField(max_length=2048)
    owner = models.ForeignKey(User, related_name='courses')
    status = models.PositiveIntegerField(choices=STATUS, default=STATUS.proposed)
    phase = models.PositiveIntegerField(choices=PHASE, default=PHASE.onboarding)
    is_featured = models.BooleanField(default=False)
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, blank=True)

    url = models.CharField(max_length=1024, null=True, blank=True)
    pdf = models.CharField(max_length=1024, null=True, blank=True)

    type = models.CharField(max_length=256, null=True, blank=True)
    publisher = models.CharField(max_length=2048, null=True, blank=True)
    published_on = models.DateField(null=True, blank=True)
    authors = models.CharField(max_length=4096, null=True, blank=True)
    pages = models.CharField(max_length=64, null=True, blank=True)

    # minimum requirements
    num_presentation = models.PositiveIntegerField(default=2, validators=[MinValueValidator(1)])
    num_graphics = models.PositiveIntegerField(default=2, validators=[MinValueValidator(0)])
    num_scripting = models.PositiveIntegerField(default=2, validators=[MinValueValidator(1)])
    num_audio = models.PositiveIntegerField(default=2, validators=[MinValueValidator(1)])
    num_dri = models.PositiveIntegerField(default=2)

    # available
    num_presentation_actual = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])
    num_graphics_actual = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])
    num_scripting_actual = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])
    num_audio_actual = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])
    num_dri_actual = models.PositiveIntegerField(default=0, validators=[MinValueValidator(0)])

    # presentation
    gid = models.CharField(max_length=256, null=True, blank=True)

    # questionnaire
    qid = models.CharField(max_length=256, null=True, blank=True)

    # slack
    cid = models.CharField(max_length=256, null=True, blank=True)
    channel = models.CharField(max_length=256, null=True, blank=True)

    # youtube
    yid = models.CharField(max_length=256, null=True, blank=True)

    # timelines
    in_progress_at = models.DateTimeField(null=True, blank=True)

    # phase timelines
    reading_at = models.DateTimeField(null=True, blank=True)
    discussion_at = models.DateTimeField(null=True, blank=True)
    slides_at = models.DateTimeField(null=True, blank=True)
    peer_review_at = models.DateTimeField(null=True, blank=True)
    audio_at = models.DateTimeField(null=True, blank=True)
    refine_at = models.DateTimeField(null=True, blank=True)
    pending_approval_at = models.DateTimeField(null=True, blank=True)
    approved_at = models.DateTimeField(null=True, blank=True)

    tracker = FieldTracker(fields=['status', 'phase'])

    objects = models.Manager()
    requirements = CourseQuerySet.as_manager()

    class Meta:
        unique_together = ('name', 'lang', 'version')

    def __unicode__(self):
        return "%s [%d slides][%s]" % (self.name, self.slides.count(), self.lang)

    def __str__(self):
        return "%s [%d slides][%s]" % (self.name, self.slides.count(), self.lang)

    @property
    def phase_display(self):
        return Course.PHASE[self.phase]

    @property
    def status_display(self):
        return Course.STATUS[self.status]

    @property
    def youtube_display(self):
        if self.yid == '' or self.yid is None:
            return ''
        return 'https://youtu.be/%s' % self.yid

    @property
    def category_display(self):
        if self.category is not None:
            return self.category.name
        return 'General'

    @property
    def lang_display(self):
        if self.lang is not None:
            return Course.LANGUAGE[self.lang]
        return 'Unknown'

    @property
    def num_presentation_required(self):
        required = self.num_presentation - self.num_presentation_actual
        if required >= 0:
            return required
        return 0

    @property
    def num_graphics_required(self):
        required = self.num_graphics - self.num_graphics_actual
        if required >= 0:
            return required
        return 0

    @property
    def num_scripting_required(self):
        required = self.num_scripting - self.num_scripting_actual
        if required >= 0:
            return required
        return 0

    @property
    def num_audio_required(self):
        required = self.num_audio - self.num_audio_actual
        if required >= 0:
            return required
        return 0

    @property
    def num_dri_required(self):
        required = self.num_dri - self.num_dri_actual
        if required >= 0:
            return required
        return 0

    @property
    def total_members(self):
        return self.members.count()

    def get_video_url(self):
        video_url = get_video_path(self.id)

        if video_url is not None:
            return '<a href="%s" target="_blank">Video</a>' % video_url
            # u'<video width="320" height="240" controls><source src="%s" type="video/mp4">Your browser does not support the video tag.</video>' % video_url
        return None

    get_video_url.short_description = 'Video'
    get_video_url.allow_tags = True

    @property
    def video_url(self):
        video_url = None
        if self.id is not None:
            video_url = get_video_path(self.id)
        return video_url

    def total_slides(self):
        if self.slides is not None:
            return self.slides.count()
        return 0

    total_slides.short_description = 'Total Slides'

    def pending_slides(self):
        if self.slides is not None:
            return self.slides.filter(status=Slide.STATUS.pending_approval).count()
        return 0

    pending_slides.short_description = 'Pending Approval'

    def delete(self, using=None, keep_parents=False):
        if self.pk is not None and len(str(self.pk)) > 0:
            folder = os.path.join(settings.MEDIA_ROOT, '%d' % self.pk)

            try:
                clear_folder(folder)
            except:
                pass

        super(Course, self).delete()

    def make_in_progress(self):
        try:
            if self.id is not None:

                # create questionnaire
                if self.qid is None:
                    response = copy_file(self.id, settings.QUESTIONNAIRE_TEMPLATE, self.name)
                    writable_permissions(response['id'])
                    self.qid = response['id']
                    # self.save()

                # copy_file(self.id, settings.WORKFLOW_TEMPLATE, self.name)

                # create presentation
                if self.gid is None:
                    response = copy_file(self.id, settings.PRESENTATION_TEMPLATE, self.name)
                    writable_permissions(response['id'])
                    self.gid = response['id']
                    # self.save()

                try:
                    # create slack channel
                    if self.cid is None:
                        slack = Slack()
                        result = slack.create_channel('%s%d' % (self.category.shortcode.lower(), self.id))
                        print result

                        if 'ok' in result and result['ok']:
                            self.channel = result['channel']['name']
                            self.cid = result['channel']['id']
                except Exception as es:
                    print "slack"
                    print es

        except Exception as e:
            # todo call sentry
            print "error while changing status to progress"
            print e


pre_save.connect(update_course_status_phase, sender=Course)


class CourseMember(TimeStampable):
    EXPERTISE = Choices(
        (1, 'novice', 'Novice'),
        (2, 'primary', 'Primary'),
        (3, 'medium', 'Medium'),
        (4, 'advanced', 'Advanced'),
        (5, 'expert', 'Expert'),
    )

    TIMEZONES = [(str(i), str(i)) for i in pytz.all_timezones]

    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='members')
    member = models.ForeignKey(User, related_name='course_contributions')
    expertise = models.PositiveIntegerField(choices=EXPERTISE, default=EXPERTISE.novice)
    timezone = models.CharField(max_length=128, choices=TIMEZONES, blank=True, null=True)
    time_commitment = models.PositiveIntegerField(default=0)  # hours per week

    presentation = models.BooleanField(default=False)
    graphics = models.BooleanField(default=False)
    scripting = models.BooleanField(default=False)
    audio = models.BooleanField(default=False)
    dri = models.BooleanField(default=False)
    been_dri = models.BooleanField(default=False)

    # field for actual selection
    is_dri = models.BooleanField(default=False)

    class Meta:
        unique_together = ('course', 'member')

    def __str__(self):
        return '%s - %s'% (self.course.name, self.member.username)


pre_delete.connect(update_course_counters, sender=CourseMember)


class Slide(TimeStampable):
    STATUS = Choices(
        (0, 'draft', 'Draft'),
        (1, 'in_progress', 'In Progress'),
        (2, 'pending_approval', 'Pending Approval'),
        (3, 'published', 'Published')
    )

    gid = models.CharField(max_length=256, null=True, blank=True)

    version = models.PositiveIntegerField(default=1)

    image = models.ImageField(upload_to=get_image_path, null=True, blank=True)
    audio = models.FileField(upload_to=get_audio_path, null=True, blank=True)
    notes = models.TextField(max_length=5000, null=True, blank=True)

    position = models.PositiveIntegerField(default=0)

    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='slides')
    status = models.PositiveIntegerField(choices=STATUS, default=STATUS.draft)
    assigned_to = models.ForeignKey(User, related_name='slides', null=True, blank=True)

    class Meta:
        ordering = ['position']

    def __str__(self):
        return '%s %d' % (self.course.name, self.position)

    @property
    def status_text(self):
        return self.STATUS[self.status]

    # @property
    def image_url(self):
        return u'<img src="%s" style="max-width:250px;max-height:250px" />' % self.image.url

    image_url.short_description = 'Image'
    image_url.allow_tags = True

    # @property
    def audio_url(self):
        return u'<audio controls src="%s" style="max-width:200px;" />' % self.audio.url

    audio_url.short_description = 'Audio'
    audio_url.allow_tags = True


class SlideReview(TimeStampable):
    STATUS = Choices(
        (1, 'proposed', 'Proposed'),
        (2, 'resolved', 'Resolved')
    )

    STAGE = Choices(
        (1, 'peer_review', 'Peer Review'),
        (2, 'refine', 'Refine')
    )

    slide = models.ForeignKey(Slide, on_delete=models.CASCADE, related_name='reviews')
    feedback = models.TextField(max_length=5000, null=True, blank=True)
    status = models.PositiveIntegerField(choices=STATUS, default=STATUS.proposed)
    stage = models.PositiveIntegerField(choices=STAGE, default=STAGE.peer_review)
    user = models.ForeignKey(User, related_name='reviews', null=True, blank=True)

    def __str__(self):
        return '%s %s' % (self.slide.course.name, self.STAGE[self.stage])
