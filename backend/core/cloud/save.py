from distutils.command import upload
from api.models import Organization, TermsOfService, TermsOfServiceVersion
from api.serializers import TermsOfServiceSerializer
from core.cloud.config import COS_S3_ENDPOINT
from core.helpers.format_name import format_name
from core.cloud.operate import Operate


def save_terms_of_service(
    organization_id, terms_of_service_name, file, description
):
    org = Organization.objects.get(id=organization_id)
    storage = Operate(org.user.first_name)
    version_number = TermsOfService.objects.next_version_number(
        name=terms_of_service_name
    )

    upload_file_name = (
        f"{format_name(terms_of_service_name)}-version-{version_number}"
    )
    bucket_name = (
        org.bucket_name if org.bucket_name != "" else storage.create_bucket()
    )
    uploaded = storage.upload_file(
        bucket_name=bucket_name,
        item_name=upload_file_name,
        file=file,
        is_tos=True,
    )

    if uploaded:
        version = TermsOfServiceVersion.objects.create(
            version_number=version_number,
            share_url=f"https://{bucket_name}.{COS_S3_ENDPOINT}/{upload_file_name}",
            storage_path=f"{bucket_name}/{upload_file_name}",
            file_size=file.size,
        )

        terms_of_service, _ = TermsOfService.objects.get_or_create(
            name=terms_of_service_name,
            organization=org,
            description=description,
        )
        terms_of_service.versions.add(version)

        serializer = TermsOfServiceSerializer(instance=terms_of_service)
        return serializer.data
    else:
        return False
