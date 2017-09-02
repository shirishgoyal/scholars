import os
import datetime
from os.path import join

import environ

ROOT_DIR = environ.Path(__file__) - 2  # (old_sch/config/settings/base.py - 3 = old_sch/)
APPS_DIR = ROOT_DIR.path('scholars')

# Load operating system environment variables and then prepare to use them
env = environ.Env()

# .env file, should always load
READ_DOT_ENV_FILE = env.bool('DJANGO_READ_DOT_ENV_FILE', default=True)

if READ_DOT_ENV_FILE:
    # Operating System Environment variables have precedence over variables defined in the .env file,
    # that is to say variables from the .env files will only be used if not defined
    # as environment variables.
    env_file = str(ROOT_DIR.path('.env'))
    print('Loading : {}'.format(env_file))

    env.read_env(env_file)

# APP CONFIGURATION
# ------------------------------------------------------------------------------
DJANGO_APPS = [
    # Default Django apps:
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.sites',
    'django.contrib.messages',
    'django.contrib.postgres',
    'django.contrib.staticfiles',

    # Useful template tags:
    # 'django.contrib.humanize',

    # Admin
    'suit',
    'django.contrib.admin',
]
THIRD_PARTY_APPS = [

    'corsheaders',
    'crispy_forms',

    'oauth2_provider',
    'social_django',

    'rest_framework',  # utilities for rest apis
    'rest_framework_social_oauth2',
    'dry_rest_permissions',

    'versatileimagefield',  # image manipulation

    # 'gdstorage',                      # google drive storage
    # 'ws4redis',
    # 'django_filters',
]

# Apps specific for this project go here.
LOCAL_APPS = [
    'scholars.authentication',
    'scholars.users',
    'scholars.courses',
    'scholars.utils',
]

INSTALLED_APPS = DJANGO_APPS + THIRD_PARTY_APPS + LOCAL_APPS

# MIDDLEWARE CONFIGURATION
# ------------------------------------------------------------------------------
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    # 'corsheaders.middleware.CorsMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# MIGRATIONS CONFIGURATION
# ------------------------------------------------------------------------------
MIGRATION_MODULES = {
    'sites': 'scholars.contrib.sites.migrations'
}

# DEBUG
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#debug
DEBUG = env.bool('DJANGO_DEBUG', False)

# FIXTURE CONFIGURATION
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#std:setting-FIXTURE_DIRS
FIXTURE_DIRS = (
    str(ROOT_DIR.path('fixtures')),
)

# EMAIL CONFIGURATION
# ------------------------------------------------------------------------------
EMAIL_BACKEND = env('DJANGO_EMAIL_BACKEND', default='django.core.mail.backends.smtp.EmailBackend')

# MANAGER CONFIGURATION
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#admins
ADMINS = [
    ("""Shirish Goyal""", 'shirish.goyal@gmail.com'),
]

# See: https://docs.djangoproject.com/en/dev/ref/settings/#managers
MANAGERS = ADMINS

# DATABASE CONFIGURATION
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#databases
DATABASES = {
    'default': env.db('DATABASE_URL', default='postgres://localhost/scholars'),
}
DATABASES['default']['ATOMIC_REQUESTS'] = True

# GENERAL CONFIGURATION
# ------------------------------------------------------------------------------
# Local time zone for this installation. Choices can be found here:
# http://en.wikipedia.org/wiki/List_of_tz_zones_by_name
# although not all choices may be available on all operating systems.
# In a Windows environment this must be set to your system time zone.
TIME_ZONE = 'UTC'

# See: https://docs.djangoproject.com/en/dev/ref/settings/#language-code
LANGUAGE_CODE = 'en-us'

# See: https://docs.djangoproject.com/en/dev/ref/settings/#site-id
SITE_ID = 1

# See: https://docs.djangoproject.com/en/dev/ref/settings/#use-i18n
USE_I18N = True

# See: https://docs.djangoproject.com/en/dev/ref/settings/#use-l10n
USE_L10N = True

# See: https://docs.djangoproject.com/en/dev/ref/settings/#use-tz
USE_TZ = True

# TEMPLATE CONFIGURATION
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#templates
TEMPLATES = [
    {
        # See: https://docs.djangoproject.com/en/dev/ref/settings/#std:setting-TEMPLATES-BACKEND
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        # See: https://docs.djangoproject.com/en/dev/ref/settings/#template-dirs
        'DIRS': [
            str(ROOT_DIR.path('templates')),
        ],
        'OPTIONS': {
            # See: https://docs.djangoproject.com/en/dev/ref/settings/#template-debug
            'debug': DEBUG,
            # 'APP_DIRS': False,
            # See: https://docs.djangoproject.com/en/dev/ref/settings/#template-loaders
            # https://docs.djangoproject.com/en/dev/ref/templates/api/#loader-types
            'loaders': [
                'django.template.loaders.filesystem.Loader',
                'django.template.loaders.app_directories.Loader',
            ],
            # See: https://docs.djangoproject.com/en/dev/ref/settings/#template-context-processors
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.template.context_processors.i18n',
                'django.template.context_processors.media',
                'django.template.context_processors.static',
                'django.template.context_processors.tz',
                'django.contrib.messages.context_processors.messages',

                # custom template context processors go here
                'social_django.context_processors.backends',
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]

# See: http://django-crispy-forms.readthedocs.io/en/latest/install.html#template-packs
CRISPY_TEMPLATE_PACK = 'bootstrap4'

# See: https://docs.djangoproject.com/en/dev/ref/settings/#static-root
STATIC_ROOT = str(ROOT_DIR('assets'))

# See: https://docs.djangoproject.com/en/dev/ref/settings/#static-url
STATIC_URL = '/static/'

# See: https://docs.djangoproject.com/en/dev/ref/contrib/staticfile\\\s/#std:setting-STATICFILES_DIRS
STATICFILES_DIRS = [
    str(ROOT_DIR.path('static')),
]

# See: https://docs.djangoproject.com/en/dev/ref/contrib/staticfiles/#staticfiles-finders
STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

# MEDIA CONFIGURATION
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#media-root
MEDIA_ROOT = str(ROOT_DIR('media'))

# See: https://docs.djangoproject.com/en/dev/ref/settings/#media-url
MEDIA_URL = '/media/'

# URL Configuration
# ------------------------------------------------------------------------------
ROOT_URLCONF = 'config.urls'

# General
APPEND_SLASH = env.bool('DJANGO_APPEND_SLASH', True)

# See: https://docs.djangoproject.com/en/dev/ref/settings/#wsgi-application
WSGI_APPLICATION = 'config.wsgi.application'

# PASSWORD STORAGE SETTINGS
# ------------------------------------------------------------------------------
# See https://docs.djangoproject.com/en/dev/topics/auth/passwords/#using-argon2-with-django
# PASSWORD_HASHERS = [
#     'django.contrib.auth.hashers.Argon2PasswordHasher',
#     'django.contrib.auth.hashers.PBKDF2PasswordHasher',
#     'django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher',
#     'django.contrib.auth.hashers.BCryptSHA256PasswordHasher',
#     'django.contrib.auth.hashers.BCryptPasswordHasher',
# ]

# AUTHENTICATION CONFIGURATION
# ------------------------------------------------------------------------------
AUTHENTICATION_BACKENDS = (
    'social_core.backends.google.GoogleOAuth2',
    'rest_framework_social_oauth2.backends.DjangoOAuth2',
    'django.contrib.auth.backends.ModelBackend',
)

# OAUTH2_PROVIDER = {
#     # The number of seconds an access token remains valid.
#     # RFC6749 Section 4.1.2 recommends a 10 minutes (600 seconds) duration.
#     'ACCESS_TOKEN_EXPIRE_SECONDS': 600
# }

JWT_AUTH = {
    'JWT_EXPIRATION_DELTA': datetime.timedelta(days=env.int('DJANGO_JWT_EXPIRATION_DELTA', default=1)),
    'JWT_ALLOW_REFRESH': False,
    'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=env.int('DJANGO_JWT_REFRESH_EXPIRATION_DELTA', default=1)),
}

SOCIAL_AUTH_URL_NAMESPACE = 'social'

SOCIAL_AUTH_PIPELINE = (
    'scholars.authentication.pipeline.auto_logout',  # custom action
    'social_core.pipeline.social_auth.social_details',
    'social_core.pipeline.social_auth.social_uid',
    'social_core.pipeline.social_auth.auth_allowed',
    'scholars.authentication.pipeline.check_email_present',  # custom action
    'scholars.authentication.pipeline.social_user',  # custom action
    'social_core.pipeline.user.get_username',
    'social_core.pipeline.social_auth.associate_by_email',
    'social_core.pipeline.user.create_user',
    'social_core.pipeline.social_auth.associate_user',
    'social_core.pipeline.social_auth.load_extra_data',
    'social_core.pipeline.user.user_details',
    'scholars.authentication.pipeline.save_avatar',  # custom action
)

SOCIAL_AUTH_USERNAME_IS_FULL_EMAIL = True

# Some really nice defaults
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_REQUIRED = True
# ACCOUNT_EMAIL_VERIFICATION = 'mandatory'

ACCOUNT_ALLOW_REGISTRATION = env.bool('DJANGO_ACCOUNT_ALLOW_REGISTRATION', True)
# ACCOUNT_ADAPTER = 'old_sch.users.adapters.AccountAdapter'
# SOCIALACCOUNT_ADAPTER = 'old_sch.users.adapters.SocialAccountAdapter'

# Custom user app defaults
# Select the correct user model
AUTH_USER_MODEL = 'users.User'
LOGIN_REDIRECT_URL = '/'
# LOGIN_URL = 'account_login'

# SLUGLIFIER
AUTOSLUG_SLUGIFY_FUNCTION = 'slugify.slugify'

REDIS_URL = env('REDIS_URL', default='redis://localhost:6379/0')

# CELERY
# INSTALLED_APPS += ['scholars.taskapp.celery.CeleryConfig']
CELERY_BROKER_URL = env('CELERY_BROKER_URL', default='django://')
if CELERY_BROKER_URL == 'django://':
    CELERY_BROKER_URL = REDIS_URL
    CELERY_RESULT_BACKEND = REDIS_URL
else:
    CELERY_RESULT_BACKEND = CELERY_BROKER_URL

CELERY_BROKER_POOL_LIMIT = None
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERY_TIMEZONE = TIME_ZONE
# END CELERY


# django-compressor
# ------------------------------------------------------------------------------
INSTALLED_APPS += ['compressor']
STATICFILES_FINDERS += ['compressor.finders.CompressorFinder']
COMPRESS_ENABLED = env.bool('DJANGO_COMPRESS_ENABLED', False)
COMPRESS_OFFLINE = env.bool('DJANGO_COMPRESS_OFFLINE', False)
# ------------------------------------------------------------------------------


# Location of root django.contrib.admin URL, use {% url 'admin:index' %}
ADMIN_URL = r'^admin/'

# Below this line define 3rd party library settings
# ------------------------------------------------------------------------------

SUIT_CONFIG = {
    # header
    'ADMIN_NAME': 'Stanford Scholar',
    'HEADER_DATE_FORMAT': 'l, j. F Y',
    'HEADER_TIME_FORMAT': 'H:i',

    # forms
    'SHOW_REQUIRED_ASTERISK': True,  # Default True
    'CONFIRM_UNSAVED_CHANGES': True,  # Default True

    # menu
    # 'SEARCH_URL': '/admin/auth/user/',
    # 'MENU_ICONS': {
    #    'sites': 'icon-leaf',
    #    'auth': 'icon-lock',
    # },
    'MENU_OPEN_FIRST_CHILD': True,  # Default True
    'MENU_EXCLUDE': ('auth', 'oauth2_provider', 'social_django'),
    # 'MENU': (
    #     'sites',
    #     {'app': 'auth', 'icon':'icon-lock', 'models': ('user', 'group')},
    #     {'label': 'Settings', 'icon':'icon-cog', 'models': ('auth.user', 'auth.group')},
    #     {'label': 'Support', 'icon':'icon-question-sign', 'url': '/support/'},
    # ),

    # misc
    'LIST_PER_PAGE': 25
}

# Logging
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'verbose': {
            'format': '%(levelname)s %(asctime)s %(module)s %(process)d %(thread)d %(message)s'
        },
        'simple': {
            'format': '%(levelname)s %(message)s'
        },
    },
    'filters': {
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
    },
    'handlers': {
        'console': {
            'level': 'INFO',
            'filters': ['require_debug_true'],
            'class': 'logging.StreamHandler',
            'formatter': 'simple'
        },
        'mail_admins': {
            'level': 'ERROR',
            'class': 'django.utils.log.AdminEmailHandler'
        }
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'propagate': True,
        },
        'django.request': {
            'handlers': ['mail_admins'],
            'level': 'ERROR',
            'propagate': False,
        },
    }
}

# Django Rest Framework
REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': env.int('DJANGO_PAGINATION_LIMIT', default=20),
    'DATETIME_FORMAT': '%Y-%m-%dT%H:%M:%S%z',
    'DEFAULT_RENDERER_CLASSES': (
        'rest_framework.renderers.JSONRenderer',
    ),
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_jwt.authentication.JSONWebTokenAuthentication',
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
        'rest_framework_social_oauth2.authentication.SocialAuthentication',
    ),
    # 'DEFAULT_FILTER_BACKENDS': (
    #     'rest_framework.filters.DjangoFilterBackend',
    # ),
}

# Versatile Image Field
VERSATILEIMAGEFIELD_SETTINGS = {
    # The amount of time, in seconds, that references to created images
    # should be stored in the cache. Defaults to `2592000` (30 days)
    'cache_length': 2592000,
    'cache_name': 'versatileimagefield_cache',
    'jpeg_resize_quality': 70,
    'sized_directory_name': '__sized__',
    'filtered_directory_name': '__filtered__',
    'placeholder_directory_name': '__placeholder__',
    'create_images_on_demand': DEBUG
}

# http://django-googledrive-storage.readthedocs.io/en/latest/
GOOGLE_DRIVE_STORAGE_JSON_KEY_FILE = env('DJANGO_GOOGLE_DRIVE_STORAGE_JSON_KEY_FILE', default='')
GOOGLE_DRIVE_STORAGE_SERVICE_EMAIL = env('DJANGO_GOOGLE_DRIVE_STORAGE_SERVICE_EMAIL', default='')

# READ ONLY
WORKFLOW_TEMPLATE = env('DJANGO_WORKFLOW_TEMPLATE', default='')
BEST_PRACTICES_TEMPLATE = env('DJANGO_BEST_PRACTICES_TEMPLATE', default='')

# UNIQUE PER TALK - CREATE COPIES OF THESE AND CHANGE TITLE
QUESTIONNAIRE_TEMPLATE = env('DJANGO_QUESTIONNAIRE_TEMPLATE', default='')
PRESENTATION_TEMPLATE = env('DJANGO_PRESENTATION_TEMPLATE', default='')

SLACK_CLIENT_ID = env('DJANGO_SLACK_CLIENT_ID', default='')
SLACK_CLIENT_SECRET = env('DJANGO_SLACK_CLIENT_SECRET', default='')
SLACK_VERIFICATION_TOKEN = env('DJANGO_SLACK_VERIFICATION_TOKEN', default='')
SLACK_OAUTH_ACCESS_TOKEN = env('DJANGO_SLACK_OAUTH_ACCESS_TOKEN', default='')
SLACK_TEAM_ID = env('DJANGO_SLACK_TEAM_ID', default='')

SOCIAL_AUTH_GOOGLE_OAUTH2_ACCESS_TOKEN_URL = env('DJANGO_SOCIAL_AUTH_GOOGLE_OAUTH2_ACCESS_TOKEN_URL', default='')
SOCIAL_AUTH_GOOGLE_OAUTH2_SCOPE = ['email', 'profile']
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = env('DJANGO_SOCIAL_AUTH_GOOGLE_OAUTH2_KEY', default='')
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = env('DJANGO_SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET', default='')
