import tempfile
import pytest
from api.models import Organization
from api.serializers import OrganizationSerializer
from core.cloud.save import save_terms_of_service
from mock import patch


@pytest.mark.django_db
@patch("core.cloud.save.Operate")
def test_save_terms_of_service(mockOperate):
    mockOperate.return_value.upload_file.return_value = True
    mockOperate.return_value.create_bucket.return_value = "sytch-org-tos-bucket"

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

        file = tempfile.TemporaryFile()
        saved_tos = save_terms_of_service(
            organization_id=org.id, terms_of_service_name="TOS 1", file=file
        )

        assert saved_tos == {
            "id": 1,
            "name": "TOS 1",
            "organization": {
                "id": 1,
                "username": "Sytch",
                "profile": {
                    "id": 1,
                    "name": "Sytch Org",
                    "email": "sytch@gmail.com",
                },
                "bucket_name": "",
            },
            "versions": [
                {
                    "id": 1,
                    "version_number": 1,
                    "storage_path": "sytch-org-tos-bucket/tos-1-version-1",
                    "share_url": "",
                }
            ],
        }
