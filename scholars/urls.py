from __future__ import unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.core.urlresolvers import reverse_lazy
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from django.views.generic.base import RedirectView
from rest_framework.routers import DefaultRouter, SimpleRouter

from courses.viewsets import CourseViewSet, SlideViewSet
from users.viewsets import UserViewSet

router = SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'slides', SlideViewSet)

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    # url(r'^django-rq/', include('django_rq.urls')),
    url(r'^api/', include('authentication.urls')),
    url(r'^api/', include(router.urls)),

    # the 'api-root' from django rest-frameworks default router
    # http://www.django-rest-framework.org/api-guide/routers/#defaultrouter
    # url(r'^$', RedirectView.as_view(url=reverse_lazy('api-root'), permanent=False)),
    url(r'^$', TemplateView.as_view(template_name='index.html')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
