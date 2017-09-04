from rest_framework import serializers

from scholars.users.serializers import UserSerializer
from scholars.utils.dynamic import DynamicFieldsModelSerializer
# from scholars.utils.serializers import ChoicesField
from .models import Course, Slide, get_video_path, Category, CourseMember, SlideReview


class TimezoneSerializer(serializers.Serializer):
    code = serializers.CharField(max_length=256, read_only=True)
    name = serializers.CharField(max_length=256, read_only=True)

    def to_representation(self, instance):
        return {'code': instance[0], 'name': instance[1]}


class LanguageSerializer(serializers.Serializer):
    code = serializers.CharField(read_only=True)
    name = serializers.CharField(max_length=256, read_only=True)

    def to_representation(self, instance):
        return {'code': instance[0], 'name': instance[1]}


class CategorySerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = Category
        fields = ('id', 'name')


class SlideReviewSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = SlideReview
        fields = (
            'id', 'slide', 'stage', 'status', 'user', 'feedback'
        )
        read_only_fields = ('id', 'user', 'slide')


class CourseMemberSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = CourseMember
        fields = (
            'course',
            'member',
            'expertise',
            'timezone',
            'time_commitment',
            'presentation',
            'graphics',
            'scripting',
            'audio',
            'dri',
            'is_dri',
            'been_dri'
        )


class CreateCourseMemberSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = CourseMember
        fields = (
            'course',
            'member',
            'expertise',
            'timezone',
            'time_commitment',
            'presentation',
            'graphics',
            'scripting',
            'audio',
            'dri',
            'is_dri',
            'been_dri'
        )
        read_only_fields = ('course', 'member', 'is_dri')
        extra_kwargs = {
            'expertise': {'required': True},
            'timezone': {'required': True},
            'time_commitment': {'required': True},
        }

    def validate_expertise(self, value):
        if value is None or value < CourseMember.EXPERTISE.novice or value > CourseMember.EXPERTISE.expert:
            raise serializers.ValidationError("Invalid value for expertise")
        return value

    def validate_time_commitment(self, value):
        if value is None or value <= 0:
            raise serializers.ValidationError("Invalid value for time commitment")
        return value

    def validate_timezone(self, value):
        if value is None:
            raise serializers.ValidationError("Invalid value for timezone")
        return value

    def validate(self, data):
        presentation = data.get('presentation', False)
        graphics = data.get('graphics', False)
        scripting = data.get('scripting', False)
        audio = data.get('audio', False)
        expertise = data.get('expertise', -1)
        time_commitment = data.get('time_commitment', -1)
        timezone = data.get('timezone', -1)

        if not (presentation or graphics or scripting or audio):
            raise serializers.ValidationError("Atleast one role must be selected")
        if expertise < 0:
            raise serializers.ValidationError("Level of expertise not provided")
        if time_commitment < 0:
            raise serializers.ValidationError("Time commitment in hours not provided")
        if timezone < 0:
            raise serializers.ValidationError("Timezone not provided")
        return data


class SlideSerializer(DynamicFieldsModelSerializer):
    assigned_to = UserSerializer(read_only=True)
    reviews = SlideReviewSerializer(many=True,read_only=True)

    class Meta:
        model = Slide
        fields = (
            'id',
            'position',
            'image',
            'audio',
            'notes',
            'course',
            'status',
            'assigned_to',
            'reviews'
        )
        read_only_fields = ('assigned_to', 'reviews', 'notes', 'course')


class VariantSerializer(DynamicFieldsModelSerializer):
    # slides = SlideSerializer(many=True)
    # members = CourseMemberSerializer(many=True)
    # owner = UserSerializer()
    # video_url = serializers.SerializerMethodField()
    # is_member = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ('id',
                  # 'qid',
                  # 'gid',
                  # 'name', 'owner',
                  # 'status', 'status_display',
                  # 'doi', 'url', 'pdf', 'publisher', 'pages',
                  # 'type',
                  # 'published_on',
                  # 'video_url',
                  'lang', 'lang_display',
                  'category',
                  # 'authors', 'slides',
                  # 'num_presentation_required',
                  # 'num_graphics_required',
                  # 'num_scripting_required',
                  # 'num_audio_required',
                  # 'num_dri_required',
                  # 'members',
                  # 'phase', 'phase_display',
                  # 'total_members',
                  # 'is_member',
                  # 'cid',
                  'yid', 'youtube_display',
                  # 'category_display'
                  )
        read_only_fields = ('owner',
                            # 'video_url',
                            'num_presentation_required',
                            'num_graphics_required',
                            'num_scripting_required',
                            'num_audio_required',
                            'num_dri_required',
                            'members',
                            'status_display',
                            'phase_display',
                            'lang_display',
                            'total_members',
                            'cid',
                            'yid', 'youtube_display',
                            'category_display')

        # def get_video_url(self, obj):
        #     video_url = get_video_path(obj.id)
        #     return video_url
        #
        # def get_is_member(self, obj):
        #     request = self.context.get('request', None)
        #     if request is not None and request.user is not None and request.user.is_authenticated():
        #         return obj.members.filter(member=request.user).count() > 0
        #     return False


class CourseSerializer(DynamicFieldsModelSerializer):
    slides = SlideSerializer(many=True, read_only=True)
    members = CourseMemberSerializer(many=True, read_only=True)
    owner = UserSerializer()
    video_url = serializers.SerializerMethodField()
    is_member = serializers.SerializerMethodField()
    variants = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = ('id', 'qid', 'gid', 'name', 'owner',
                  'status', 'status_display',
                  'doi', 'url', 'pdf', 'publisher', 'pages',
                  'type',
                  'published_on', 'video_url',
                  'lang', 'lang_display',
                  'authors', 'slides',
                  'num_presentation_required',
                  'num_graphics_required',
                  'num_scripting_required',
                  'num_audio_required',
                  'num_dri_required',
                  'members',
                  'phase', 'phase_display',
                  'total_members',
                  'is_member',
                  'cid',
                  'yid', 'youtube_display',
                  'category', 'category_display',
                  'variants',
                  'in_progress_at',
                  'reading_at',
                  'discussion_at',
                  'slides_at',
                  'peer_review_at',
                  'audio_at',
                  'refine_at',
                  'pending_approval_at'
                  )
        read_only_fields = ('owner', 'video_url',
                            'num_presentation_required',
                            'num_graphics_required',
                            'num_scripting_required',
                            'num_audio_required',
                            'num_dri_required',
                            'members',
                            'slides',
                            'status_display',
                            'phase_display',
                            'total_members',
                            'cid',
                            'yid', 'youtube_display',
                            'lang_display',
                            'category_display',
                            'variants',
                            'in_progress_at',
                            'reading_at',
                            'discussion_at',
                            'slides_at',
                            'peer_review_at',
                            'audio_at',
                            'refine_at',
                            'pending_approval_at'
                            )

    def get_video_url(self, obj):
        video_url = get_video_path(obj.id)
        return video_url

    def get_is_member(self, obj):
        request = self.context.get('request', None)
        if request is not None and request.user is not None and request.user.is_authenticated():
            return obj.members.filter(member=request.user).count() > 0
        return False

    def get_variants(self, obj):
        if obj.parent is not None:
            variants = list(obj.parent.variants.exclude(id=obj.id))
            variants.append(obj.parent)
            variants = sorted(variants, cmp=lambda x, y: cmp(x.lang, y.lang))
            return VariantSerializer(instance=variants, many=True).data
        else:
            return VariantSerializer(instance=obj.variants.order_by('lang'), many=True).data


class CreateCourseSerializer(serializers.ModelSerializer):
    pdf = serializers.URLField(required=True)
    class Meta:
        model = Course
        fields = ('gid', 'name', 'id', 'owner', 'status', 'phase', 'doi', 'url', 'pdf', 'publisher', 'pages', 'type',
                  'published_on', 'lang', 'category',
                  'authors', 'slides')
        read_only_fields = ('id', 'owner', 'status', 'slides')
        extra_kwargs = {
            'category': {'allow_null': False, 'required': True},    
            'lang': {'allow_null': False, 'required': True}    
        }


class CreateSlideReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = SlideReview
        fields = ('slide', 'stage', 'status', 'feedback')
        read_only_fields = ('id', 'slide', 'status', 'user')
