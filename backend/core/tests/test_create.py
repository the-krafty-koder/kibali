import pytest
from api.serializers import OrganizationSerializer
from api.models import Organization
from core.cloud.create import generate_bucket_name
from mock import patch

from core.cloud.operate import Operate


def test_generate_bucket_name():
    generated_name = generate_bucket_name("Sytch Org")
    assert generated_name == "sytch-org-tos-bucket"


@pytest.mark.django_db
@patch("core.cloud.operate.run_config")
def test_create_organization_bucket(mockRunConfig):
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

    mockRunConfig.return_value.Bucket.return_value.create.return_value = {
        "Location": "sytch-org-tos-bucket"
    }
    operate = Operate("Sytch Org")
    operate.create_bucket()
    assert operate.bucket_name == "sytch-org-tos-bucket"

    org = Organization.objects.get(profile__name="Sytch Org")
    assert org.bucket_name == "sytch-org-tos-bucket"
