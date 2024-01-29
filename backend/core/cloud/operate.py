from core.cloud.config import run_config
from core.cloud.create import create_organization_bucket
from core.cloud.upload import upload_to_cloud


class Operate:
    def __init__(self, organization):
        self.cos = run_config()
        self.organization = organization

    def create_bucket(self):
        response = create_organization_bucket(self.cos, self.organization)
        if response.startswith("Error"):
            return response
        return response

    def upload_file(self, bucket_name, item_name, file):
        response = upload_to_cloud(self.cos, bucket_name, item_name, file)
        if response.startswith("Error"):
            return False
        return True
