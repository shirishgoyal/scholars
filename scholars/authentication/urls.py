from django.conf.urls import include, url

from authentication import views

urlpatterns = [
    url(r'^auth/login/', views.obtain_auth_token),
    # url(r'^auth/', include('rest_framework.urls', namespace='rest_framework')),
]
