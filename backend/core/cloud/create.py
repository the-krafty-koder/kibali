from api.models import Organization
from core.helpers.format_name import format_name
from core.cloud.config import COS_LOCATION
import ibm_boto3
from ibm_botocore.client import Config, ClientError
import logging


def create_organization_bucket(cos, organization_name):
    formatted_name = format_name(organization_name)
    bucket_name = f"{formatted_name}-tos-bucket"
    try:
        response = cos.create_bucket(
            Bucket=bucket_name,
            CreateBucketConfiguration={"LocationConstraint": COS_LOCATION},
        )

        Organization.objects.filter(user__first_name=organization_name).update(
            bucket_name=bucket_name
        )

        return response.pop("Location", bucket_name)
    except ClientError as ce:
        logging.log(level=logging.INFO, msg=ce)
        return f"Error on upload: {ce}"
    except Exception as e:
        logging.log(level=logging.INFO, msg=e)
        return f"Error occurred: {e}"
    return
