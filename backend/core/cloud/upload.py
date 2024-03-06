from core.cloud.config import run_config
import ibm_boto3
from ibm_botocore.client import Config, ClientError


def upload_to_cloud(cos, bucket_name, item_name, file, is_tos):
    content_type = (
        "application/pdf"
        if is_tos is True
        else f"image/{file.name.split('.').pop()}"
    )
    try:
        response = cos.put_object(
            Body=file,
            Bucket=bucket_name,
            Key=item_name,
            ContentType=content_type,
            ContentDisposition="inline",
        )
        if response.pop("ResponseMetadata").pop("HTTPStatusCode") == 200:
            return "Uploaded"
        return ""
    except ClientError as ce:
        print(f"Error on upload: {ce}")
        return f"Error on upload: {ce}"
    except Exception as e:
        print(f"Error occurred: {e}")
        return f"Error occurred: {e}"
