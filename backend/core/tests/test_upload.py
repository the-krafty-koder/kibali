from api.serializers import OrganizationSerializer
import pytest
from mock import patch
from api.models import Organization

from core.cloud.operate import Operate
from core.settings import BASE_DIR


@patch("core.cloud.operate.run_config")
def test_upload(mockRunConfig):
    mockRunConfig.return_value.Object.return_value.put.return_value = {
        "ResponseMetadata": {"HTTPStatusCode": 200}
    }
    operate = Operate("Sytch Org")
    operate.bucket_name = "sytch-org-tos-bucket"
    with open(
        f"{BASE_DIR}/core/tests/fixtures/sample_file.txt", "r"
    ) as sample_file:
        uploaded = operate.upload_file(sample_file.name, sample_file.buffer)
        assert uploaded is True
