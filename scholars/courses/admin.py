from django.contrib import admin

from scholars.utils.utils import export_video, import_presentation, free_space, send_manually_exception_email, \
    process_links
from .models import Course, Slide, Category, CourseMember, SlideReview


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'shortcode')
    ordering = ('id',)


class SlideInline(admin.TabularInline):
    model = Slide
    extra = 0
    fields = ('image_url', 'notes', 'audio_url', 'status', 'assigned_to')
    readonly_fields = ('image_url', 'audio_url')
    ordering = ['position']


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    inlines = [SlideInline]
    actions = ['generate', 'import_from_google', 'export_to_video', 'cleanup', 'process_redundancy']
    list_display = (
    'id', 'name', 'status', 'phase', 'lang', 'doi', 'category', 'publisher', 'yid', 'get_video_url', 'total_slides',
    'pending_slides',
    'is_featured')
    list_editable=('is_featured',)
    # filter_vertical = ('lang', 'status', 'phase', 'category')
    ordering = ('id',)

    def get_actions(self, request):
        actions = super(CourseAdmin, self).get_actions(request)
        # if 'delete_selected' in actions:
        #     del actions['delete_selected']
        return actions

    def import_from_google(self, request, queryset):
        courses = queryset.all()

        for instance in courses:
            if instance.id is not None and instance.gid is not None:
                error = import_presentation(instance.id, instance.gid)

                if error is not None:
                    send_manually_exception_email(request, error)

    import_from_google.short_description = "Import"

    def export_to_video(self, request, queryset):
        courses = queryset.all()

        for instance in courses:
            if instance.id is not None and instance.gid is not None:
                export_video(instance.id)

    export_video.short_description = "Export"

    def cleanup(self, request, queryset):
        courses = queryset.all()

        for instance in courses:
            if instance.id is not None and instance.gid is not None:
                free_space(instance.id)

    cleanup.short_description = "Cleanup"

    def process_redundancy(self, request, queryset):
        courses = queryset.all()

        for instance in courses:
            if instance.id is not None and instance.gid is not None:
                process_links(instance.id)

    process_redundancy.short_description = "Redundancy (DONT USE)"


@admin.register(CourseMember)
class CourseMemberAdmin(admin.ModelAdmin):
    list_display = ('id', 'course', 'member', 'is_dri', 'time_commitment', 'expertise', 'timezone', 'presentation', 'graphics',
                    'scripting', 'audio', 'dri')
    ordering = ('id',)


@admin.register(SlideReview)
class SlideReviewAdmin(admin.ModelAdmin):
    list_display = ('id', 'slide', 'user', 'status', 'stage', 'feedback')
    ordering = ('id',)
