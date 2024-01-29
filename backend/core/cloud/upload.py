from core.cloud.config import run_config
import ibm_boto3
from ibm_botocore.client import Config, ClientError


def upload_to_cloud(cos, bucket_name, item_name, file):
    try:
        response = cos.Object(bucket_name, item_name).put(Body=file)
        if response.pop("ResponseMetadata").pop("HTTPStatusCode") == 200:
            return "Uploaded"
        return ""
    except ClientError as ce:
        raise ce
        return f"Error on upload: {ce}"
    except Exception as e:
        raise e
        return f"Error occurred: {e}"
