from django.contrib import admin

from utils.utils import export
from .models import Course, Slide


class SlideInline(admin.TabularInline):
    model = Slide
    extra = 0
    fields = ('image_url', 'notes', 'audio_url','status')
    readonly_fields = ('image_url', 'audio_url')
    ordering = ['position']


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    inlines = [SlideInline]
    actions = ['generate']

    def generate(self, request, queryset):
        courses = queryset.all()

        for instance in courses:
            if instance.id is not None and instance.gid is not None:
                export(instance.id, instance.gid)

    generate.short_description = "Generate"
