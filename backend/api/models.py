"""Models definition"""

from email.policy import default
from functools import reduce
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import AbstractUser, User
from django.utils import timezone
from django.db import models
from django.utils.translation import gettext_lazy as _

from core.helpers.format_name import format_name


# Create your models here.

datetimeFormat = "%Y-%m-%d %H:%M:%S"


class OrganizationUser(AbstractUser):
    email = models.EmailField(_("email address"), unique=True)
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "username", "password"]


class Organization(models.Model):
    """
    Organization Model
    """

    user = models.OneToOneField(
        OrganizationUser, on_delete=models.CASCADE, blank=False
    )
    bucket_name = models.CharField()
    phone_number = models.CharField()
    country = models.CharField()
    logo_url = models.CharField(default="", blank=True)


class TermsOfServiceVersion(models.Model):
    """
    TermsOfServiceVersion model
    """

    version_number = models.IntegerField()
    share_url = models.URLField(blank=True)
    storage_path = models.CharField()
    created_at = models.DateTimeField(default=timezone.now())
    file_size = models.IntegerField()

    class Meta:
        ordering = ["-created_at"]


class TermsOfServiceManager(models.Manager):
    def latest_version(self, name):
        """
        Returns latest version of the terms of service
        """
        tos = self.filter(name=name).first()
        if tos:
            latestVersion = (
                tos.versions.all().order_by("-version_number").first()
            )
            return latestVersion

        return None

    def next_version_number(self, name):
        """
        Returns next version number of the terms of service
        """
        version = self.latest_version(name)
        if version:
            return version.version_number + 1

        return 1


class TermsOfService(models.Model):
    """
    TermsOfService model
    """

    name = models.CharField(blank=False, unique=True)
    versions = models.ManyToManyField(TermsOfServiceVersion, blank=True)
    created_at = models.DateTimeField(default=timezone.now())
    description = models.CharField(default="", blank=True)
    active = models.BooleanField(default=True)
    organization = models.ForeignKey(
        Organization, on_delete=models.CASCADE, blank=False
    )

    objects = TermsOfServiceManager()

    def version_paths(self):
        paths = map(
            lambda version: f"{format_name(self.name)}-version-{version.version_number}",
            self.versions.all(),
        )

        return paths

    @property
    def total_file_size(self):
        total_size = self.versions.aggregate(models.Sum("file_size"))[
            "file_size__sum"
        ]

        if total_size:
            return round(total_size / (1024 * 1024), 3)

        return 0

    class Meta:
        ordering = ["-created_at"]


class IAMToken(models.Model):
    token = models.CharField()
