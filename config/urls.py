from __future__ import unicode_literals

from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
from django.views.generic import TemplateView
from rest_framework.routers import SimpleRouter
from django.views import defaults as default_views


from scholars.courses.viewsets import CourseViewSet, SlideViewSet, CategoryViewSet, LanguageViewSet, TimezoneViewSet, \
    SlideReviewViewSet
from scholars.users.viewsets import UserViewSet

router = SimpleRouter()
router.register(r'users', UserViewSet)
router.register(r'timezones', TimezoneViewSet, base_name='timezones')
router.register(r'languages', LanguageViewSet, base_name='languages')
router.register(r'categories', CategoryViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'slides', SlideViewSet)
router.register(r'reviews', SlideReviewViewSet)

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/', include('scholars.authentication.urls')),
    url(r'^api/auth/', include('rest_framework_social_oauth2.urls')),

    url(r'^api/', include(router.urls)),

    # the 'api-root' from django rest-frameworks default router
    # http://www.django-rest-framework.org/api-guide/routers/#defaultrouter
    # url(r'^$', RedirectView.as_view(url=reverse_lazy('api-root'), permanent=False)),
    url(r'^$', TemplateView.as_view(template_name='index.html')),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        url(r'^400/$', default_views.bad_request, kwargs={'exception': Exception('Bad Request!')}),
        url(r'^403/$', default_views.permission_denied, kwargs={'exception': Exception('Permission Denied')}),
        url(r'^404/$', default_views.page_not_found, kwargs={'exception': Exception('Page not Found')}),
        url(r'^500/$', default_views.server_error),
    ]
    if 'debug_toolbar' in settings.INSTALLED_APPS:
        import debug_toolbar
        urlpatterns = [
            url(r'^__debug__/', include(debug_toolbar.urls)),
        ] + urlpatterns
