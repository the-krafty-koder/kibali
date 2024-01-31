"""Models definition"""
from email.policy import default
from django.utils import timezone
from django.db import models

from core.helpers.format_name import format_name


# Create your models here.

datetimeFormat = "%Y-%m-%d %H:%M:%S"


class OrganizationProfile(models.Model):
    """
    OrganizationProfile model
    """

    name = models.CharField(max_length=50, unique=True)
    email = models.EmailField(max_length=50, unique=True)


class Organization(models.Model):
    """
    Organization Model
    """

    username = models.CharField(unique=True, blank=False)
    password = models.TextField(unique=True, blank=False)
    profile = models.ForeignKey(
        OrganizationProfile, on_delete=models.CASCADE, blank=False
    )
    bucket_name = models.CharField()


class TermsOfServiceVersion(models.Model):
    """
    TermsOfServiceVersion model
    """

    version_number = models.IntegerField()
    share_url = models.URLField(blank=True)
    storage_path = models.CharField()
    created_at = models.DateTimeField(default=timezone.now())


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
