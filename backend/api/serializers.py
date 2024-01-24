from rest_framework import serializers
from .models import (
    OrganizationProfile,
    Organization,
    TermsOfServiceVersion,
    TermsOfService,
)


class OrganizationProfileSerializer(serializers.ModelSerializer):
    """Serializer for organization profile model"""

    class Meta:
        fields = "__all__"
        model = OrganizationProfile


class OrganizationSerializer(serializers.ModelSerializer):
    """Serializer for organization model"""

    profile = OrganizationProfileSerializer()

    class Meta:
        fields = ["id", "username", "profile"]
        model = Organization

    def create(self, validated_data):
        profile_data = validated_data.pop("profile")
        profile = OrganizationProfile.objects.create(**profile_data)
        organization = Organization.objects.create(
            **validated_data, profile=profile
        )
        return organization

    def update(self, validated_data):
        orgId = validated_data.pop("id")
        profile_data = validated_data.pop("profile")

        updatedProfile = OrganizationProfile.objects.filter(
            id=profile_data["id"]
        ).update(**profile_data)

        organization = Organization.objects.filter(id=orgId).update(
            **validated_data, profile=updatedProfile
        )
        return organization


class TermsOfServiceVersionSerializer(serializers.ModelSerializer):
    """Serializer for terms of service version model"""

    class Meta:
        fields = ["version_number", "share_url", "id"]
        model = TermsOfServiceVersion


class TermsOfServiceSerializer(serializers.ModelSerializer):
    """Serializer for organization model"""

    versions = TermsOfServiceVersionSerializer(many=True)

    class Meta:
        fields = ["versions", "id"]
        model = TermsOfService

    def create(self, validated_data):
        versions = validated_data.pop("versions")
        newVersions = map(
            lambda version: TermsOfServiceVersion.objects.create(**version),
            versions,
        )
        termsOfService = TermsOfService.objects.create()
        termsOfService.versions.set(newVersions)
        return termsOfService

    def update(self, validated_data):
        versions = validated_data.pop("versions")
        tosId = validated_data.pop("id")
        for version in versions:
            TermsOfServiceVersion.objects.filter(version["id"]).update(
                **version
            )
        tos = TermsOfService.objects.get(id=tosId)
        return tos
