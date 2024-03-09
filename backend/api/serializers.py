import logging
import re

from django.contrib.auth.models import User
from rest_framework import serializers
from .models import (
    Organization,
    OrganizationUser,
    TermsOfServiceVersion,
    TermsOfService,
)
from django.contrib.auth.password_validation import validate_password


class UserSerializer(serializers.ModelSerializer):
    """Serializer for organization user model"""

    password = serializers.CharField(
        write_only=True,
        required=False,
    )

    class Meta:
        fields = [
            "id",
            "username",
            "email",
            "password",
            "first_name",
        ]
        model = OrganizationUser

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = OrganizationUser.objects.create(**validated_data)

        user.set_password(password)
        user.save()
        return user

    # def update(self, instance, validated_data):
    #     OrganizationUser.objects.filter(id=).update(**validated_data)
    #     instance.save()
    #     return instance

    # def validate(self, attrs):
    #     password = attrs.get("password")
    #     print("pass", password)
    #     if (
    #         re.search("[A-Z]", password) is None
    #         and re.search("[0-9]", password) is None
    #         and re.search("[^A-Za-z0-9]", password) is None
    #     ):
    #         raise serializers.ValidationError(
    #             "Password must contain alphanumeric values"
    #         )

    #     return attrs


class OrganizationSerializer(serializers.ModelSerializer):
    """Serializer for organization model"""

    user = UserSerializer()
    bucket_name = serializers.CharField(read_only=True)

    class Meta:
        fields = [
            "id",
            "user",
            "bucket_name",
            "phone_number",
            "country",
            "logo_url",
        ]
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

    def update(self, instance, validated_data):
        # user_data = validated_data.pop("user")
        # logging.log(level=logging.INFO, msg=user_data)

        # user = OrganizationUser.objects.filter(id=instance.user.id).update(
        #     **user_data
        # )
        org = Organization.objects.filter(id=instance.id).update(
            **validated_data
        )

        return org


class TermsOfServiceVersionSerializer(serializers.ModelSerializer):
    """Serializer for terms of service version model"""

    class Meta:
        fields = [
            "id",
            "version_number",
            "storage_path",
            "share_url",
            "file_size",
            "created_at",
        ]
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
    total_file_size = serializers.ReadOnlyField()
    slug = serializers.ReadOnlyField()

    class Meta:
        fields = [
            "name",
            "versions",
            "organization",
            "id",
            "organization_id",
            "total_file_size",
            "slug",
            "created_at",
            "description",
            "active",
        ]
        model = TermsOfService

    # def update(self, instance, validated_data):
    #     tos = TermsOfService.objects.filter(id=instance.id).update(
    #         **validated_data
    #     )
    #     return tos


class UploadFileSerializer(serializers.Serializer):
    file = serializers.FileField(allow_empty_file=False)
    description = serializers.CharField(required=False)
    name = serializers.CharField(required=False)
