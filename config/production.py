import os
from configurations import values
# from boto.s3.connection import OrdinaryCallingFormat
from .common import Common

try:
    # Python 2.x
    import urlparse
except ImportError:
    # Python 3.x
    from urllib import parse as urlparse


class Production(Common):
    DEBUG = False

    # Honor the 'X-Forwarded-Proto' header for request.is_secure()
    # https://devcenter.heroku.com/articles/getting-started-with-django
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

    INSTALLED_APPS = Common.INSTALLED_APPS
    SECRET_KEY = values.SecretValue()

    DATABASES = values.DatabaseURLValue()

    # django-secure
    # http://django-secure.readthedocs.org/en/v0.1.2/settings.html
    INSTALLED_APPS += ("djangosecure", )

    SECURE_HSTS_SECONDS = 60
    SECURE_HSTS_INCLUDE_SUBDOMAINS = values.BooleanValue(True)
    SECURE_FRAME_DENY = values.BooleanValue(True)
    SECURE_CONTENT_TYPE_NOSNIFF = values.BooleanValue(True)
    SECURE_BROWSER_XSS_FILTER = values.BooleanValue(True)
    SESSION_COOKIE_SECURE = values.BooleanValue(True)
    SESSION_COOKIE_HTTPONLY = values.BooleanValue(True)
    SECURE_SSL_REDIRECT = values.BooleanValue(True)
    CSRF_COOKIE_SECURE = values.BooleanValue(True)
    # CSRF_COOKIE_DOMAIN = '*.scholar.stanford.edu'
    CSRF_USE_SESSIONS = True
    CSRF_TRUSTED_ORIGINS = ['scholar.stanford.edu', 'scholar.5harad.com']

    # Site
    # https://docs.djangoproject.com/en/1.6/ref/settings/#allowed-hosts
    ALLOWED_HOSTS = ["*"]

    INSTALLED_APPS += ("gunicorn", )

    # Template
    # https://docs.djangoproject.com/en/dev/ref/settings/#template-dirs
    # TEMPLATE_LOADERS = (
    #     ('django.template.loaders.cached.Loader', (
    #         'django.template.loaders.filesystem.Loader',
    #         'django.template.loaders.app_directories.Loader',
    #     )),
    # )

    # Static files
    # STATICFILES_STORAGE = 'whitenoise.django.GzipManifestStaticFilesStorage'

    # Caching
    # redis_url = urlparse.urlparse(os.environ.get('REDISTOGO_URL', 'redis://localhost:6379'))
    # CACHES = {
    #     'default': {
    #         'BACKEND': 'redis_cache.RedisCache',
    #         'LOCATION': '{}:{}'.format(redis_url.hostname, redis_url.port),
    #         'OPTIONS': {
    #             'DB': 0,
    #             'PASSWORD': redis_url.password,
    #             'PARSER_CLASS': 'redis.connection.HiredisParser',
    #             'CONNECTION_POOL_CLASS': 'redis.BlockingConnectionPool',
    #             'CONNECTION_POOL_CLASS_KWARGS': {
    #                 'max_connections': 50,
    #                 'timeout': 20,
    #             }
    #         }
    #     }
    # }

    # Django RQ production settings
    # RQ_QUEUES = {
    #     'default': {
    #         'URL': os.getenv('REDISTOGO_URL', 'redis://localhost:6379'),
    #         'DB': 0,
    #         'DEFAULT_TIMEOUT': 500,
    #     },
    # }

    Common.VERSATILEIMAGEFIELD_SETTINGS['create_images_on_demand'] = False

    EMAIL_USE_TLS = True
    EMAIL_HOST = 'smtp.gmail.com'
    EMAIL_HOST_USER = 'stanfordcrowdcourse@gmail.com'
    EMAIL_HOST_PASSWORD = values.Value('DJANGO_EMAIL_HOST_PASSWORD')
    EMAIL_PORT = 587
    DEFAULT_FROM_EMAIL = EMAIL_HOST_USER
    SERVER_EMAIL = EMAIL_HOST_USER

    # QUESTIONNAIRE_TEMPLATE = '1uLFtzF4ajs9Q7rewhtTMwEUNrsdfwnUkn8LsKNMkVfc'
    # WORKFLOW_TEMPLATE = '11IOqPg1hDonRexopxm3D3kwbhK33jk5wJJIjsy87zdU'
    # PRESENTATION_TEMPLATE = '1ujb5t2hj5OScqBsBW7g9s6umSLfFCNmNI0dY4W8uVgY'

    SLACK_CLIENT_ID = values.Value('SLACK_CLIENT_ID')
    SLACK_CLIENT_SECRET = values.Value('SLACK_CLIENT_SECRET')
    SLACK_VERIFICATION_TOKEN = values.Value('SLACK_VERIFICATION_TOKEN')
    SLACK_OAUTH_ACCESS_TOKEN = values.Value('SLACK_OAUTH_ACCESS_TOKEN')

    SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = values.Value('SOCIAL_AUTH_GOOGLE_OAUTH2_KEY')
    SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = values.Value('SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET')



