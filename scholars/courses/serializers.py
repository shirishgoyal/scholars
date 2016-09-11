from rest_framework import serializers

from users.serializers import UserSerializer
from utils.serializers import ChoicesField
from .models import Course, Slide


class SlideSerializer(serializers.ModelSerializer):
    assigned_to = UserSerializer(read_only=True)
    status_text = serializers.SerializerMethodField()

    class Meta:
        model = Slide
        fields = ('id', 'position', 'image', 'audio', 'notes', 'course', 'status', 'status_text', 'assigned_to')
        read_only_fields = ('assigned_to', 'status_text')

    def get_status_text(self, obj):
        return obj.get_status_display()


class CourseSerializer(serializers.ModelSerializer):
    slides = SlideSerializer(many=True)
    status = ChoicesField(choices=Course.STATUS)
    owner = UserSerializer()

    class Meta:
        model = Course
        fields = ('id', 'gid', 'name', 'owner', 'status', 'slides')
        read_only_fields = ('owner',)
