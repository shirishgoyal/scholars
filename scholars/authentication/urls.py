from django.conf.urls import include, url
from rest_framework_jwt.views import refresh_jwt_token

from scholars.authentication.views import SocialView

urlpatterns = [
    url(r'^auth/google/', SocialView.as_view()),
    # url(r'^auth/token/refresh/', refresh_jwt_token),
]
