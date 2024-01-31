from wsgiref import validate
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
        fields = ["id", "name", "email"]
        model = OrganizationProfile


class OrganizationSerializer(serializers.ModelSerializer):
    """Serializer for organization model"""

    profile = OrganizationProfileSerializer()
    bucket_name = serializers.CharField(read_only=True)

    class Meta:
        fields = ["id", "username", "profile", "bucket_name"]
        model = Organization

    def create(self, validated_data):
        profile_data = validated_data.pop("profile")
        profile = OrganizationProfile.objects.create(**profile_data)
        organization = Organization.objects.create(
            **validated_data, profile=profile
        )
        return organization


class TermsOfServiceVersionSerializer(serializers.ModelSerializer):
    """Serializer for terms of service version model"""

    class Meta:
        fields = ["id", "version_number", "storage_path", "share_url"]
        model = TermsOfServiceVersion


class TermsOfServiceSerializer(serializers.ModelSerializer):
    """Serializer for terms of service model"""

    versions = TermsOfServiceVersionSerializer(many=True, read_only=True)
    organization = OrganizationSerializer(read_only=True)
    organization_id = serializers.PrimaryKeyRelatedField(
        queryset=Organization.objects.all(),
        source="organization",
        write_only=True,
    )

    class Meta:
        fields = ["name", "versions", "organization", "id", "organization_id"]
        model = TermsOfService

    def update(self, validated_data):
        versions = validated_data.pop("versions")
        tosId = validated_data.pop("id")
        for version in versions:
            TermsOfServiceVersion.objects.filter(version["id"]).update(
                **version
            )
        tos = TermsOfService.objects.get(id=tosId)
        return tos


class UploadTermsOfServiceSerializer(serializers.Serializer):
    file = serializers.FileField(allow_empty_file=False)
    name = serializers.CharField()
