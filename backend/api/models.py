"""Models definition"""
from email.policy import default
from django.utils import timezone
from django.db import models

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

    version_number = models.IntegerField(blank=False)
    share_url = models.URLField()
    storage_url = models.URLField(blank=False)
    created_at = models.DateTimeField(default=timezone.now())


class TermsOfService(models.Model):
    """
    TermsOfService model
    """

    name = models.CharField(blank=False)
    versions = models.ManyToManyField(TermsOfServiceVersion)
    created_at = models.DateTimeField(default=timezone.now())
    organization = models.ForeignKey(
        Organization, on_delete=models.CASCADE, blank=False
    )

    def latest_version(self):
        """
        Returns latest version of the terms of service
        """
        return self.versions
