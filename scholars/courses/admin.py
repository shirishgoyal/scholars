from django.contrib import admin

from utils.utils import export_video, import_presentation, free_space, send_manually_exception_email, process_links
from .models import Course, Slide


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
    list_display = ('id', 'name', 'get_video_url', 'total_slides', 'pending_slides')
    ordering = ('id',)

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

