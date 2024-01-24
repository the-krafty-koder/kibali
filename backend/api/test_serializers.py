import pytest
import django.utils.timezone
from mock import patch
from datetime import datetime
from .models import OrganizationProfile
from .serializers import (
    OrganizationSerializer,
    OrganizationProfileSerializer,
    TermsOfServiceSerializer,
)
from collections import OrderedDict


@pytest.fixture
def setup():
    op = OrganizationProfile.objects.create(name="OP", email="op@gmail.com")
    OrganizationProfile.objects.filter(email="op@gmail.com").update(
        name="op2@gmail.com"
    )
    ops = OrganizationProfileSerializer(op)
    return op, ops.data


@patch("api.models.timezone.now", "2024-01-24T11:58:15.221040Z")
class TestSerializer:
    @pytest.mark.django_db
    def test_organization_profile_creation_and_update(self, setup):
        _, ops = setup
        assert ops == {"id": 1, "name": "OP", "email": "op@gmail.com"}

    @pytest.mark.django_db
    def test_organization_creation_and_update(self):
        serializedOrg = OrganizationSerializer(
            data={
                "username": "Org",
                "password": "Org254",
                "profile": {"id": 2, "name": "OP2", "email": "op2@gmail.com"},
            }
        )
        if serializedOrg.is_valid():
            serializedOrg.save()
        assert serializedOrg.data == {
            "id": 1,
            "username": "Org",
            "profile": OrderedDict(
                {"id": 2, "name": "OP2", "email": "op2@gmail.com"}
            ),
        }

    @pytest.mark.django_db
    def test_terms_of_service_creation_and_update(self):
        termsOfService = TermsOfServiceSerializer(
            data={
                "versions": [
                    {
                        "version_number": 1,
                        "share_url": "https://share.url",
                    }
                ]
            }
        )
        if termsOfService.is_valid():
            termsOfService.save()
        assert termsOfService.data == {
            "id": 1,
            "versions": [
                OrderedDict(
                    {
                        "version_number": 1,
                        "share_url": "https://share.url",
                        "id": 1,
                    }
                )
            ],
        }
