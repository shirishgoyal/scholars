from rest_framework import serializers

from scholars.users.serializers import UserSerializer
from scholars.utils.dynamic import DynamicFieldsModelSerializer
# from scholars.utils.serializers import ChoicesField
from .models import Course, Slide, get_video_path, Category


class LanguageSerializer(serializers.Serializer):
    code = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=256, read_only=True)

    def to_representation(self, instance):
        return {'code': instance[0], 'name': instance[1]}


class CategorySerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class SlideSerializer(DynamicFieldsModelSerializer):
    assigned_to = UserSerializer(read_only=True)
    status_text = serializers.SerializerMethodField()

    class Meta:
        model = Slide
        fields = ('id', 'position', 'image', 'audio', 'notes', 'course', 'status', 'status_text', 'assigned_to')
        read_only_fields = ('assigned_to', 'status_text')

    def get_status_text(self, obj):
        return obj.get_status_display()


class CourseSerializer(DynamicFieldsModelSerializer):
    slides = SlideSerializer(many=True)
    # status = ChoiceField(choices=Course.STATUS)
    # phase = ChoicesField(choices=Course.PHASE)
    # lang = ChoicesField(choices=Course.LANGUAGE)
    # category = ChoicesField(choices=Category.objects.all())
    owner = UserSerializer()
    video_url = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ('id', 'qid', 'gid', 'name', 'owner', 'status', 'phase', 'doi', 'url', 'pdf', 'publisher', 'pages',
                  'type',
                  'published_on', 'video_url', 'lang', 'category',
                  'authors', 'slides')
        read_only_fields = ('owner', 'video_url')

    def get_video_url(self, obj):
        video_url = get_video_path(obj.id)
        return video_url

        # if video_url is not None:
        # return '<a href="%s" target="_blank">Video</a>' % video_url
        # return u'<video width="320" height="240" controls><source src="%s" type="video/mp4">Your browser does not support the video tag.</video>' % video_url
        # return None


class CreateCourseSerializer(serializers.ModelSerializer):
    # def create(self, validated_data):
    #     user = User.objects.create_user(**validated_data)
    #     return user
    # category = ChoicesField(choices=Category.objects.all(), required=True)
    # lang = ChoicesField(choices=Course.LANGUAGE, required=True)

    class Meta:
        model = Course
        fields = ('gid', 'name', 'id', 'owner', 'status', 'phase', 'doi', 'url', 'pdf', 'publisher', 'pages', 'type',
                  'published_on', 'lang', 'category',
                  'authors', 'slides')
        read_only_fields = ('id', 'owner', 'status', 'slides')
