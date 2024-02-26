import ibm_boto3
import environ
import os
from ibm_botocore.client import Config, ClientError
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

env = environ.Env()
environ.Env.read_env(os.path.join(BASE_DIR, ".env"))

COS_LOCATION = env("COS_LOCATION")
COS_API_KEY = env("COS_API_KEY")
COS_API_ENDPOINT = env("COS_API_ENDPOINT")
COS_API_INSTANCE_ID = env("COS_API_INSTANCE_ID")
COS_S3_ENDPOINT = COS_API_ENDPOINT.split("https://")[-1]


def run_config():
    cos = ibm_boto3.resource(
        "s3",
        ibm_api_key_id=COS_API_KEY,
        ibm_service_instance_id=COS_API_INSTANCE_ID,
        config=Config(signature_version="oauth"),
        endpoint_url=COS_API_ENDPOINT,
    )
    return cos


def create_client():
    cos = ibm_boto3.client(
        "s3",
        ibm_api_key_id=COS_API_KEY,
        ibm_service_instance_id=COS_API_INSTANCE_ID,
        config=Config(signature_version="oauth"),
        endpoint_url=COS_API_ENDPOINT,
    )
    return cos
