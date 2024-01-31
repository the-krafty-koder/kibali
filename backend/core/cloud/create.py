from api.models import Organization
from core.helpers.format_name import format_name
from core.cloud.config import COS_LOCATION
import ibm_boto3
from ibm_botocore.client import Config, ClientError


def create_organization_bucket(cos, organization_name):
    formatted_name = format_name(organization_name)
    bucket_name = f"{formatted_name}-tos-bucket"
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
