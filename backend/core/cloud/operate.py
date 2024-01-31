from core.cloud.delete import delete_terms_of_service_versions
from core.cloud.config import create_client, run_config
from core.cloud.create import create_organization_bucket
from core.cloud.upload import upload_to_cloud


class Operate:
    def __init__(self, organization_name):
        self.cos = run_config()
        self.cos_client = create_client()
        self.organization_name = organization_name

    def create_bucket(self):
        response = create_organization_bucket(self.cos, self.organization_name)
        if response.startswith("Error"):
            return response
        return response

    def upload_file(self, bucket_name, item_name, file):
        response = upload_to_cloud(self.cos, bucket_name, item_name, file)
        if response.startswith("Error"):
            return False
        return True

    def delete_file(self, bucket_name, item_names):
        res = delete_terms_of_service_versions(
            self.cos_client, bucket_name, item_names
        )
        return res
