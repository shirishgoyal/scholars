import copy

from django.conf import settings
from django.db.models import F
from rest_framework import status, pagination
from rest_framework import viewsets
from rest_framework.decorators import detail_route, list_route
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from scholars.utils.utils import import_presentation, send_manually_exception_email, copy_file, writable_permissions
from .models import Course, Slide, Category, CourseMember
from .permissions import IsOwnerOrReadOnly
from .serializers import CourseSerializer, SlideSerializer, CreateCourseSerializer, CategorySerializer, \
    LanguageSerializer, CreateCourseMemberSerializer, CourseMemberSerializer, TimezoneSerializer


class BasePagination(pagination.PageNumberPagination):
    page_size_query_param = 'page_size'


class TimezoneViewSet(viewsets.ViewSet):
    serializer_class = TimezoneSerializer

    def list(self, request, *args, **kwargs):
        serializer = TimezoneSerializer(
            instance=CourseMember.TIMEZONES, many=True)
        return Response(serializer.data)


class LanguageViewSet(viewsets.ViewSet):
    serializer_class = LanguageSerializer

    def list(self, request, *args, **kwargs):
        serializer = LanguageSerializer(
            instance=Course.LANGUAGE, many=True)
        return Response(serializer.data)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all().order_by('name')
    serializer_class = CategorySerializer
    permission_classes = (IsOwnerOrReadOnly,)


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = (IsOwnerOrReadOnly,)
    pagination_class = BasePagination

    def create(self, request, *args, **kwargs):
        self.serializer_class = CreateCourseSerializer

        serializer = self.get_serializer(data=request.data, context={'request': request})
        self.permission_classes = (AllowAny,)

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        instance = Course.objects.get(id=serializer.data['id'])

        try:
            if instance.id is not None:
                # instance templates
                response = copy_file(instance.id, settings.QUESTIONNAIRE_TEMPLATE, instance.name)
                writable_permissions(response['id'])
                instance.qid = response['id']
                instance.save()

                # copy_file(instance.id, settings.WORKFLOW_TEMPLATE, instance.name)

                response = copy_file(instance.id, settings.PRESENTATION_TEMPLATE, instance.name)
                writable_permissions(response['id'])
                instance.gid = response['id']
                instance.save()

                # error = import_presentation(instance.id, instance.gid)
        except Exception as e:
            send_manually_exception_email(request, e.message)

            instance.delete()
            return Response({'non_field_errors': ['Talk creation failed']}, status=status.HTTP_400_BAD_REQUEST)

        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True, fields=('id', 'name', 'status', 'phase', 'owner'),
                                             context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, fields=('id', 'name', 'status', 'phase', 'owner'),
                                         context={'request': request})
        return Response(serializer.data)

    @list_route(url_path='featured')
    def list_featured(self, request, *args, **kwargs):
        queryset = self.filter_queryset(
            self.get_queryset().filter(status=Course.STATUS.published, is_featured=True).order_by(
                '-updated_at'))

        fields = (
            'id', 'name',
            'status', 'status_display',
            'phase', 'phase_display',
            'owner', 'video_url', 'lang',
            'authors',
            'publisher', 'published_on',
            'pages', 'type', 'url',
            'yid', 'youtube_display'
        )

        serializer = self.get_serializer(queryset, many=True,
                                         fields=fields, context={'request': request})
        return Response(serializer.data)

    @list_route(url_path='published')
    def list_published(self, request, *args, **kwargs):
        queryset = self.filter_queryset(
            self.get_queryset().filter(status=Course.STATUS.published, lang=Course.LANGUAGE.en,
                                       is_featured=False).order_by(
                '-updated_at'))

        fields = (
            'id', 'name',
            'status', 'status_display',
            'phase', 'phase_display',
            'owner', 'video_url', 'lang',
            'authors',
            'publisher', 'published_on',
            'pages', 'type', 'url',
            'yid', 'youtube_display',
            'pdf',
            'category', 'category_display'
        )

        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True,
                                             fields=fields, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True,
                                         fields=fields, context={'request': request})
        return Response(serializer.data)

    @list_route(url_path='proposed')
    def list_proposed(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset().filter(status=Course.STATUS.proposed).order_by(
            '-updated_at'))

        fields = (
            'id', 'name',
            'status', 'status_display',
            'phase', 'phase_display',
            'owner',
            'authors', 'publisher', 'published_on',
            'pages', 'type', 'url',
            'num_presentation_required', 'num_graphics_required', 'num_scripting_required', 'num_audio_required',
            'num_dri_required',
            'members', 'total_members',
            'is_member'
        )

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True, fields=fields, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, fields=fields, context={'request': request})
        return Response(serializer.data)

    @list_route(url_path='in-progress')
    def list_in_progress(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset().filter(status=Course.STATUS.in_progress).order_by(
            '-updated_at'))

        fields = (
            'id', 'name',
            'status', 'status_display',
            'phase', 'phase_display',
            'owner', 'authors', 'publisher', 'published_on',
            'pages', 'type', 'url', 'total_members',
            'is_member'
        )

        page = self.paginate_queryset(queryset)

        if page is not None:
            serializer = self.get_serializer(page, many=True, fields=fields, context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, fields=fields, context={'request': request})
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, context={'request': request})
        return Response(serializer.data)

    @detail_route(methods=['post'], url_path='join')
    def join(self, request, *args, **kwargs):
        self.serializer_class = CourseSerializer
        course = self.get_object()

        members = course.members.filter(member=request.user)

        # already a member
        if members.count() == 0:
            serializer = CreateCourseMemberSerializer(data=request.data, context={'request': request})
            self.permission_classes = (AllowAny,)

            serializer.is_valid(raise_exception=True)
            instance = serializer.save(course=course, member=self.request.user)

            if serializer.data['presentation'] is True:
                course.num_presentation_actual = F('num_presentation_actual') + 1
            if serializer.data['graphics'] is True:
                course.num_graphics_actual = F('num_graphics_actual') + 1
            if serializer.data['scripting'] is True:
                course.num_scripting_actual = F('num_scripting_actual') + 1
            if serializer.data['audio'] is True:
                course.num_audio_actual = F('num_audio_actual') + 1
            if serializer.data['dri'] is True:
                course.num_dri_actual = F('num_dri_actual') + 1
            course.save()
        else:
            instance = members.first()

        serializer = CourseMemberSerializer(instance=instance, context={'request': request})
        return Response(serializer.data, status.HTTP_200_OK)

    @detail_route(methods=['post'], url_path='generate')
    def generate(self, request, *args, **kwargs):
        instance = self.get_object()
        if instance.id is not None and instance.gid is not None:
            error = import_presentation(instance.id, instance.gid)

            if error is not None:
                send_manually_exception_email(request, error)

        serializer = self.get_serializer(instance=instance, context={'request': request})
        return Response(serializer.data, status.HTTP_200_OK)

    @detail_route(methods=['get'], url_path='related')
    def list_related(self, request, *args, **kwargs):
        instance = self.get_object()

        queryset = self.filter_queryset(
            self.get_queryset().filter(status=Course.STATUS.published, category=instance.category, lang='en').order_by(
                '?')[:5])

        fields = (
            'id', 'name',
            'status', 'status_display',
            'phase', 'phase_display',
            'owner', 'video_url', 'lang',
            'authors',
            'publisher', 'published_on',
            'pages', 'type', 'url',
            'yid', 'youtube_display'
        )

        serializer = self.get_serializer(queryset, many=True,
                                         fields=fields, context={'request': request})
        return Response(serializer.data)


class SlideViewSet(viewsets.ModelViewSet):
    queryset = Slide.objects.all()
    serializer_class = SlideSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True,
                                             fields=('id', 'position', 'course', 'status', 'status_text'),
                                             context={'request': request})
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True,
                                         fields=('id', 'position', 'course', 'status', 'status_text'),
                                         context={'request': request})
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, context={'request': request})
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = copy.copy(request.data)

        partial = kwargs.pop('partial', True)

        if instance.assigned_to == request.user \
            and instance.status == Slide.STATUS.in_progress \
            and 'audio' in request.data:
            audio = request.data['audio']

            data['audio'] = audio
            data['status'] = Slide.STATUS.pending_approval
            data['assigned_to'] = instance.course.owner

        data['course'] = instance.course.id

        serializer = self.get_serializer(instance=instance, data=data, partial=partial, context={'request': request})
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    @detail_route(methods=['put'], url_path='assign')
    def assign(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.status == 0:
            instance.assigned_to = request.user
            instance.status = Slide.STATUS.in_progress
            instance.save()

        serializer = self.get_serializer(instance=instance, context={'request': request})
        return Response(serializer.data, status.HTTP_200_OK)

    @detail_route(methods=['put'], url_path='release')
    def release(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.status == 1 and instance.assigned_to is not None and instance.assigned_to == request.user:
            instance.assigned_to = None
            instance.status = Slide.STATUS.draft
            instance.save()

        serializer = self.get_serializer(instance=instance, context={'request': request})
        return Response(serializer.data, status.HTTP_200_OK)

    @detail_route(methods=['put'], url_path='approve')
    def approve(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.status == 2 and instance.course.owner == request.user:
            # instance.assigned_to = User.objects.get(username='admin')
            instance.status = Slide.STATUS.published
            instance.save()

        serializer = self.get_serializer(instance=instance, context={'request': request})
        return Response(serializer.data, status.HTTP_200_OK)

    @detail_route(methods=['put'], url_path='reject')
    def reject(self, request, *args, **kwargs):
        instance = self.get_object()

        if instance.status == 2 and instance.course.owner == request.user:
            # instance.assigned_to = User.objects.get(username='admin')
            instance.status = Slide.STATUS.in_progress
            instance.save()

        serializer = self.get_serializer(instance=instance, context={'request': request})
        return Response(serializer.data, status.HTTP_200_OK)
