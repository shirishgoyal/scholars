from __future__ import unicode_literals

import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.encoding import python_2_unicode_compatible

# from django.utils.translation import ugettext_lazy as _
from model_utils import Choices


@python_2_unicode_compatible
class User(AbstractUser):
    GENDER_CHOICES = Choices(
        ('unknown', 'unknown', 'Unknown'),
        ('male', 'male', 'Male'),
        ('female', 'female', 'Female'),
    )

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    gender = models.CharField(max_length=8, choices=GENDER_CHOICES, default=GENDER_CHOICES.unknown)
    avatar = models.URLField(null=True, blank=True)

    slack_id = models.CharField(max_length=256, null=True, blank=True)
    slack_name = models.CharField(max_length=256, null=True, blank=True)

    def __str__(self):
        return "%s %s" % (self.first_name, self.last_name)
