from core.cloud.config import create_client
from core.cloud.delete import delete_terms_of_service_versions
import pytest
from api.serializers import OrganizationSerializer
from api.models import Organization
from core.cloud.operate import Operate
from mock import patch


@pytest.mark.django_db
@patch("core.cloud.operate.create_client")
def test_delete_terms_of_service(mockOperate):
    mockOperate.return_value.delete_objects.return_value = {
        "Deleted": [
            {
                "Key": "sytch-org-tos-bucket/tos-1-version-1",
            }
        ]
    }

    serializedOrg = OrganizationSerializer(
        data={
            "username": "Sytch",
            "password": "Sytch254",
            "profile": {
                "name": "Sytch Org",
                "email": "sytch@gmail.com",
            },
        }
    )
    if serializedOrg.is_valid():
        serializedOrg.save()

    org = Organization.objects.get(username="Sytch")

    res = Operate(org.username).delete_file(
        "sytch-org-tos-bucket",
        [
            "sytch-org-tos-bucket/tos-1-version-1",
        ],
    )

    assert res == [
        {
            "Key": "sytch-org-tos-bucket/tos-1-version-1",
        }
    ]


@pytest.mark.django_db
@patch("core.cloud.operate.create_client")
def test_delete_terms_of_service_version(mockOperate):
    mockOperate.return_value.delete_objects.return_value = {
        "Deleted": [
            {
                "Key": "sytch-org-tos-bucket/tos-1-version-1",
            }
        ]
    }

    serializedOrg = OrganizationSerializer(
        data={
            "username": "Sytch",
            "password": "Sytch254",
            "profile": {
                "name": "Sytch Org",
                "email": "sytch@gmail.com",
            },
        }
    )
    if serializedOrg.is_valid():
        serializedOrg.save()

    res = delete_terms_of_service_versions(
        create_client(),
        "sytch-org-tos-bucket",
        [
            "sytch-org-tos-bucket/tos-1-version-1",
        ],
    )

    assert res == [
        {
            "Key": "sytch-org-tos-bucket/tos-1-version-1",
        }
    ]
