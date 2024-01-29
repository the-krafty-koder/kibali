from api.models import Organization
from core.cloud.config import COS_LOCATION
import ibm_boto3
from ibm_botocore.client import Config, ClientError


def generate_bucket_name(organization_name):
    formatted_name = "-".join(organization_name.split(" ")).lower()
    return f"{formatted_name}-tos-bucket"


def create_organization_bucket(cos, organization_name):
    bucket_name = generate_bucket_name(organization_name)
    try:
        response = cos.Bucket(bucket_name).create(
            CreateBucketConfiguration={"LocationConstraint": COS_LOCATION}
        )

        Organization.objects.filter(profile__name=organization_name).update(
            bucket_name=bucket_name
        )

        return response.pop("Location", bucket_name)
    except ClientError as ce:
        return f"Error on upload: {ce}"
    except Exception as e:
        return f"Error occurred: {e}"
    return
