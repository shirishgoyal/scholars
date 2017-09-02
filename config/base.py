import os
import datetime
from os.path import join

import environ

ROOT_DIR = environ.Path(__file__) - 1  # (old_sch/config/settings/base.py - 3 = old_sch/)
APPS_DIR = ROOT_DIR.path('old_sch')

# Load operating system environment variables and then prepare to use them
env = environ.Env()

# .env file, should load only in development environment
READ_DOT_ENV_FILE = env.bool('DJANGO_READ_DOT_ENV_FILE', default=False)

if READ_DOT_ENV_FILE:
    # Operating System Environment variables have precedence over variables defined in the .env file,
    # that is to say variables from the .env files will only be used if not defined
    # as environment variables.
    env_file = str(ROOT_DIR.path('.env'))
    print('Loading : {}'.format(env_file))
    env.read_env(env_file)
    print('The .env file has been loaded. See base.py for more information')

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
    'django.contrib.admin',
]
THIRD_PARTY_APPS = [

    'corsheaders',
    'crispy_forms',

    'oauth2_provider',
    'social_django',

    # 3rd party apps
    'rest_framework',  # utilities for rest apis
    'rest_framework_social_oauth2',
    # 'rest_framework.authtoken',       # token authentication
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
    'corsheaders.middleware.CorsMiddleware',
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
    'sites': 'old_sch.contrib.sites.migrations'
}

# DEBUG
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#debug
DEBUG = env.bool('DJANGO_DEBUG', False)

# FIXTURE CONFIGURATION
# ------------------------------------------------------------------------------
# See: https://docs.djangoproject.com/en/dev/ref/settings/#std:setting-FIXTURE_DIRS
FIXTURE_DIRS = (
    str(APPS_DIR.path('fixtures')),
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

# See: https://docs.djangoproject.com/en/dev/ref/settings/#wsgi-application
WSGI_APPLICATION = 'config.wsgi.application'

# PASSWORD STORAGE SETTINGS
# ------------------------------------------------------------------------------
# See https://docs.djangoproject.com/en/dev/topics/auth/passwords/#using-argon2-with-django
PASSWORD_HASHERS = [
    'django.contrib.auth.hashers.Argon2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2PasswordHasher',
    'django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher',
    'django.contrib.auth.hashers.BCryptSHA256PasswordHasher',
    'django.contrib.auth.hashers.BCryptPasswordHasher',
]

# AUTHENTICATION CONFIGURATION
# ------------------------------------------------------------------------------
AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]

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

# CELERY
INSTALLED_APPS += ['old_sch.taskapp.celery.CeleryConfig']
CELERY_BROKER_URL = env('CELERY_BROKER_URL', default='django://')
if CELERY_BROKER_URL == 'django://':
    CELERY_RESULT_BACKEND = 'redis://'
else:
    CELERY_RESULT_BACKEND = CELERY_BROKER_URL
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

# Your common stuff: Below this line define 3rd party library settings
# ------------------------------------------------------------------------------



from configurations import Configuration, values

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


class Common(Configuration):
    INSTALLED_APPS = (
        'suit',
        'django.contrib.admin',
        'django.contrib.auth',
        'django.contrib.contenttypes',
        'django.contrib.sessions',
        'django.contrib.messages',
        'django.contrib.postgres',
        'django.contrib.staticfiles',

        'corsheaders',
        'compressor',
        'crispy_forms',

        'oauth2_provider',
        'social_django',

        # 3rd party apps
        'rest_framework',  # utilities for rest apis
        'rest_framework_social_oauth2',
        # 'rest_framework.authtoken',       # token authentication
        'dry_rest_permissions',

        'versatileimagefield',  # image manipulation

        # 'gdstorage',                      # google drive storage
        # 'ws4redis',
        # 'django_filters',

        # apps
        'scholars.authentication',
        'scholars.users',
        'scholars.courses',
        'scholars.utils',
    )

    # https://docs.djangoproject.com/en/1.8/topics/http/middleware/
    MIDDLEWARE_CLASSES = (
        'django.contrib.sessions.middleware.SessionMiddleware',
        'corsheaders.middleware.CorsMiddleware',
        'django.middleware.common.CommonMiddleware',
        'django.middleware.csrf.CsrfViewMiddleware',
        'django.contrib.auth.middleware.AuthenticationMiddleware',
        'django.contrib.messages.middleware.MessageMiddleware',
        'django.middleware.clickjacking.XFrameOptionsMiddleware',
        'django.middleware.security.SecurityMiddleware'
    )

    ROOT_URLCONF = 'config.urls'

    SECRET_KEY = 'Not a secret'
    WSGI_APPLICATION = 'config.wsgi.application'

    # Email
    EMAIL_BACKEND = values.Value('django.core.mail.backends.smtp.EmailBackend')

    MANAGERS = (
        ('Author', 'shirish.goyal@gmail.com'),
    )

    ADMINS = [
        ('Shirish', 'shirish.goyal@gmail.com')
    ]

    # Postgres
    DATABASES = values.DatabaseURLValue('postgres://localhost/scholars')

    # General
    APPEND_SLASH = values.BooleanValue(False)

    TIME_ZONE = 'UTC'
    USE_TZ = True

    LANGUAGE_CODE = 'en-us'
    # If you set this to False, Django will make some optimizations so as not
    # to load the internationalization machinery.
    USE_I18N = True
    USE_L10N = True

    LOGIN_REDIRECT_URL = '/'

    ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    # Static Files
    STATIC_ROOT = join(BASE_DIR, 'assets')
    STATICFILES_DIRS = [join(BASE_DIR, 'static'), ]
    STATIC_URL = '/static/'
    STATICFILES_FINDERS = (
        'django.contrib.staticfiles.finders.FileSystemFinder',
        'django.contrib.staticfiles.finders.AppDirectoriesFinder',
        'compressor.finders.CompressorFinder',
    )

    COMPRESS_ENABLED = values.BooleanValue(False)
    COMPRESS_OFFLINE = values.BooleanValue(False)

    # Media files
    MEDIA_ROOT = join(BASE_DIR, 'media')
    MEDIA_URL = '/media/'

    TEMPLATES_DIR = join(BASE_DIR, 'templates')
    TEMPLATES = [
        {
            'BACKEND': 'django.template.backends.django.DjangoTemplates',
            'APP_DIRS': False,
            'DIRS': [TEMPLATES_DIR],
            'OPTIONS': {
                'context_processors': [
                    'django.template.context_processors.debug',
                    'django.template.context_processors.request',
                    'django.contrib.auth.context_processors.auth',
                    'django.template.context_processors.i18n',
                    'django.template.context_processors.media',
                    'django.template.context_processors.static',
                    'django.template.context_processors.tz',
                    'django.contrib.messages.context_processors.messages',
                    'social_django.context_processors.backends',
                    'social_django.context_processors.login_redirect',
                ],
                'loaders': [
                    ('django.template.loaders.cached.Loader', [
                        'django.template.loaders.filesystem.Loader',
                        'django.template.loaders.app_directories.Loader',
                    ]),
                ],
            },
        },
    ]

    # Set DEBUG to False as a default for safety
    # https://docs.djangoproject.com/en/dev/ref/settings/#debug
    DEBUG = values.BooleanValue(False)

    for config in TEMPLATES:
        config['OPTIONS']['debug'] = DEBUG

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
            # 'rq_console': {
            #     'format': '%(asctime)s %(message)s',
            #     'datefmt': '%H:%M:%S',
            # },
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
            # 'rq_console': {
            #     'level': 'DEBUG',
            #     'class': 'rq.utils.ColorizingStreamHandler',
            #     'formatter': 'rq_console',
            #     'exclude': ['%(asctime)s'],
            # },
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
            # 'rq.worker': {
            #     'handlers': ['rq_console'],
            #     'level': 'DEBUG'
            # }
        }
    }

    # Custom user app
    AUTH_USER_MODEL = 'users.User'

    AUTHENTICATION_BACKENDS = (
        'social_core.backends.google.GoogleOAuth2',
        'rest_framework_social_oauth2.backends.DjangoOAuth2',
        'django.contrib.auth.backends.ModelBackend',
    )

    # Django Rest Framework
    REST_FRAMEWORK = {
        'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
        'PAGE_SIZE': int(os.getenv('DJANGO_PAGINATION_LIMIT', 15)),
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

    # REST_FRAMEWORK_JWT_ALLOW_REFRESH = False  # avoid timer based solutions to refresh token
    # JWT_EXPIRATION_DELTA = 24*60*60  # seconds

    JWT_AUTH = {
        'JWT_EXPIRATION_DELTA': datetime.timedelta(days=1),
        'JWT_ALLOW_REFRESH': False,
        'JWT_REFRESH_EXPIRATION_DELTA': datetime.timedelta(days=1),
    }

    SOCIAL_AUTH_URL_NAMESPACE = 'social'
    # DRFSO2_URL_NAMESPACE = 'social'
    # SOCIAL_AUTH_ADMIN_USER_SEARCH_FIELDS = ['username', 'first_name', 'last_name', 'email', 'image', 'birthday',
    #                                         'gender']
    #
    # SOCIAL_AUTH_PIPELINE = (
    #     'scholars.authentication.pipeline.auto_logout',
    #
    #     # Get the information we can about the user and return it in a simple
    #     # format to create the user instance later. On some cases the details are
    #     # already part of the auth response from the provider, but sometimes this
    #     # could hit a provider API.
    #     'social_core.pipeline.social_auth.social_details',
    #
    #     # Get the social uid from whichever service we're authing thru. The uid is
    #     # the unique identifier of the given user in the provider.
    #     'social_core.pipeline.social_auth.social_uid',
    #
    #     # Verifies that the current auth process is valid within the current
    #     # project, this is where emails and domains whitelists are applied (if
    #     # defined).
    #     'social_core.pipeline.social_auth.auth_allowed',
    #
    #     'scholars.authentication.pipeline.check_email_present',
    #
    #     # Checks if the current social-account is already associated in the site.
    #     'scholars.authentication.pipeline.social_user',
    #
    #     # Make up a username for this person, appends a random string at the end if
    #     # there's any collision.
    #     'social_core.pipeline.user.get_username',
    #
    #     # Send a validation email to the user to verify its email address.
    #     # Disabled by default.
    #     # 'social_core.pipeline.mail.mail_validation',
    #
    #     # Associates the current social details with another user account with
    #     # a similar email address. Disabled by default.
    #     'social_core.pipeline.social_auth.associate_by_email',
    #
    #     # Create a user account if we haven't found one yet.
    #     'social_core.pipeline.user.create_user',
    #
    #     # Create the record that associates the social account with the user.
    #     'social_core.pipeline.social_auth.associate_user',
    #
    #     # Populate the extra_data field in the social record with the values
    #     # specified by settings (and the default ones like access_token, etc).
    #     'social_core.pipeline.social_auth.load_extra_data',
    #
    #     # Update the user record with any changed info from the auth service.
    #     'social_core.pipeline.user.user_details',
    #
    #     'scholars.authentication.pipeline.save_avatar',
    # )

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
        'create_images_on_demand': False
    }

    # django-rq
    # Adds dashboard link for queues in /admin, This will override the default
    # admin template so it may interfere with other apps that modify the
    # default admin template. If you're using such an app, simply remove this.
    # RQ_SHOW_ADMIN_LINK = True

    # http://django-googledrive-storage.readthedocs.io/en/latest/
    GOOGLE_DRIVE_STORAGE_JSON_KEY_FILE = 'gdrive-9f7d7b145768.json'
    GOOGLE_DRIVE_STORAGE_SERVICE_EMAIL = 'slides@fifth-chalice-142403.iam.gserviceaccount.com'

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
        'MENU_EXCLUDE': ('auth.group',),
        # 'MENU': (
        #     'sites',
        #     {'app': 'auth', 'icon':'icon-lock', 'models': ('user', 'group')},
        #     {'label': 'Settings', 'icon':'icon-cog', 'models': ('auth.user', 'auth.group')},
        #     {'label': 'Support', 'icon':'icon-question-sign', 'url': '/support/'},
        # ),

        # misc
        'LIST_PER_PAGE': 25
    }

    # READ ONLY
    WORKFLOW_TEMPLATE = '1DBM-v8bieVlUlnDZihCM4MlTZCLGCuw8ezVlF5Re0wc'
    BEST_PRACTICES_TEMPLATE = '1sQS_OZ9A9HLoQcJGlVjRXKiPJvt62oafW7CyKFELwaM'

    # UNIQUE PER TALK - CREATE COPIES OF THESE AND CHANGE TITLE
    QUESTIONNAIRE_TEMPLATE = '18A4oFaknlfbj4V1dbj_mS3QT2mnWnU826fhoJZO2oRo'
    PRESENTATION_TEMPLATE = '1Fxul07yiAVKU02KnoQaZ_iOpSF-fJr0WmsDucOxpbKc'

    # Celery
    REDIS_URL = os.environ.get('REDIS_URL', 'redis://localhost:6379')

    CELERY_BROKER_URL = "django://"
    BROKER_URL = REDIS_URL
    BROKER_POOL_LIMIT = None
    CELERY_RESULT_BACKEND = REDIS_URL
    CELERY_ACCEPT_CONTENT = ['application/json']
    CELERY_TASK_SERIALIZER = 'json'
    CELERY_RESULT_SERIALIZER = 'json'
    CELERY_TIMEZONE = 'UTC'
