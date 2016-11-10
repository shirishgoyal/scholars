import copy

from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import detail_route
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from users.models import User
from utils.utils import import_presentation
from .models import Course, Slide
from .permissions import IsOwnerOrReadOnly
from .serializers import CourseSerializer, SlideSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = (IsOwnerOrReadOnly,)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        self.permission_classes = (AllowAny,)

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True, fields=('id', 'name', 'status','owner'))
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, fields=('id', 'name', 'status', 'owner'))
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

        # @detail_route(methods=['post'], url_path='generate')
        # def generate(self, request, *args, **kwargs):
        #     instance = self.get_object()
        #     if instance.id is not None and instance.gid is not None:
        #         import_presentation(instance.id, instance.gid)
        #     serializer = self.get_serializer(instance=instance, context={'request': request})
        #     return Response(serializer.data, status.HTTP_200_OK)


class SlideViewSet(viewsets.ModelViewSet):
    queryset = Slide.objects.all()
    serializer_class = SlideSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True, fields=('id', 'position', 'course', 'status', 'status_text'))
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(queryset, many=True, fields=('id', 'position', 'course', 'status', 'status_text'))
        return Response(serializer.data)

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = copy.copy(request.data)

        partial = kwargs.pop('partial', False)

        print request.FILES

        if instance.assigned_to == request.user \
            and instance.status == Slide.STATUS.in_progress \
                and 'audio' in request.FILES:
            audio = request.FILES['audio']
            data['audio'] = audio
            data['status'] = Slide.STATUS.pending_approval
            data['assigned_to'] = User.objects.get(username='admin')

        data['course'] = instance.course.id

        print data

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
