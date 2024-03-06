import logging
import requests
from api.models import IAMToken
from api.token_updater import update_token
from core.cloud.delete import delete_terms_of_service_versions
from core.cloud.config import COS_API_ENDPOINT, create_client, run_config
from core.cloud.create import create_organization_bucket
from core.cloud.upload import upload_to_cloud


class Operate:
    def __init__(self, organization_name):
        self.cos = run_config()
        self.cos_client = create_client()
        self.organization_name = organization_name

    def create_bucket(self):
        response = create_organization_bucket(
            self.cos_client, self.organization_name
        )
        if response.startswith("Error"):
            return response
        return response

    def upload_file(self, bucket_name, item_name, file, is_tos):
        response = upload_to_cloud(
            self.cos_client, bucket_name, item_name, file, is_tos
        )
        if response.startswith("Error"):
            return False
        self.make_public(bucket_name=bucket_name, item_name=item_name)
        return response

    def make_public(self, bucket_name, item_name):
        token = IAMToken.objects.all().first()
        if not token:
            token = update_token()
        else:
            token = token.token
        endpoint = f"{COS_API_ENDPOINT}/{bucket_name}/{item_name}?acl"
        requests.put(
            url=endpoint,
            headers={
                "Authorization": f"Bearer {token}",
                "x-amz-acl": "public-read",
            },
        )

    def delete_file(self, bucket_name, item_names):
        res = delete_terms_of_service_versions(
            self.cos_client, bucket_name, item_names
        )
        return res
