import re

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import (
    Organization,
    TermsOfServiceVersion,
    TermsOfService,
)
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):
    """Serializer for user model"""

    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password]
    )

    class Meta:
        fields = [
            "id",
            "username",
            "email",
            "password",
            "first_name",
        ]
        model = User

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = User.objects.create(**validated_data)

        user.set_password(password)
        user.save()
        return user

    def validate(self, attrs):
        password = attrs.get("password")
        if (
            re.search("[A-Z]", password) is None
            and re.search("[0-9]", password) is None
            and re.search("[^A-Za-z0-9]", password) is None
        ):
            raise serializers.ValidationError(
                "Password must contain alphanumeric values"
            )

        return attrs


class OrganizationSerializer(serializers.ModelSerializer):
    """Serializer for organization model"""

    user = UserSerializer()
    bucket_name = serializers.CharField(read_only=True)

    class Meta:
        fields = ["id", "user", "bucket_name"]
        model = Organization

    def create(self, validated_data):
        user_data = validated_data.pop("user")
        serialize_user = UserSerializer(data=user_data)
        if serialize_user.is_valid():
            user = serialize_user.save()

            organization = Organization.objects.create(
                **validated_data, user=user
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
