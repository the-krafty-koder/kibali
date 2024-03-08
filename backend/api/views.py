import datetime
from pypdf import PdfReader
from symbol import term
from django.core.serializers import serialize
from django.http import Http404
from django.http.multipartparser import MultiPartParser
from core.cloud.config import COS_S3_ENDPOINT, create_client
from core.cloud.delete import delete_terms_of_service_versions
from core.cloud.save import save_terms_of_service
from core.cloud.operate import Operate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .models import (
    Organization,
    TermsOfService,
    TermsOfServiceVersion,
)
from .serializers import (
    OrganizationSerializer,
    TermsOfServiceSerializer,
    TermsOfServiceVersionSerializer,
    UploadFileSerializer,
    UserSerializer,
)


class TermsOfServiceListAPIView(APIView):
    """List all terms of service or create a new one"""

    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        orgId = self.kwargs.get("id")
        tosList = TermsOfService.objects.filter(organization__id=orgId)
        serializer = TermsOfServiceSerializer(tosList, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TermsOfServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TermsOfServiceVersionAPIView(
    generics.RetrieveUpdateDestroyAPIView,
):
    queryset = TermsOfServiceVersion.objects.all()
    serializer_class = TermsOfServiceVersionSerializer
    permission_classes = (IsAuthenticated,)

    def delete(self, request, pk):
        # bucket_name = request.data.pop("bucket-name")
        # version_name = request.data.pop("version-name")

        terms_of_service_version = TermsOfServiceVersion.objects.get(id=pk)
        # cos_client = create_client()
        # delete_terms_of_service_versions(
        #     cos_client, bucket_name, [version_name]
        # )

        terms_of_service_version.delete()
        return Response({"terms_of_service_version": "null"})


class TermsOfServiceAPIView(
    generics.RetrieveUpdateDestroyAPIView,
):
    queryset = TermsOfService.objects.all()
    serializer_class = TermsOfServiceSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self, pk):
        try:
            return TermsOfService.objects.get(pk=pk)
        except TermsOfService.DoesNotExist:
            raise Http404

    def put(self, request, pk, format=None):
        termsOfService = self.get_object(pk)

        serializer = TermsOfServiceSerializer(termsOfService, data=request.data)

        if serializer.is_valid():
            serializer.save()
            tos = self.get_object(pk=pk)
            tos_serializer = TermsOfServiceSerializer(instance=tos)

            return Response(tos_serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        terms_of_service = TermsOfService.objects.get(id=pk)
        ops = Operate(terms_of_service.organization.user.username)
        # deleted = ops.delete_file(
        #     terms_of_service.organization.bucket_name,
        #     terms_of_service.version_paths(),
        # )
        terms_of_service.delete()
        return Response(
            {"terms_of_service": terms_of_service.id, "versions": []}
        )


class OrganizationAPIView(APIView):
    """
    Retrieve, update or delete a snippet instance.
    """

    def get_object(self, pk):
        try:
            return Organization.objects.get(pk=pk)
        except Organization.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        organization = self.get_object(pk)
        organization_serializer = OrganizationSerializer(organization)
        return Response(organization_serializer.data)

    def put(self, request, pk, format=None):
        organization = self.get_object(pk)

        user_serializer = UserSerializer(
            organization.user, data=request.data.pop("user")
        )
        serializer = OrganizationSerializer(
            organization, data=request.data, partial=True
        )
        if serializer.is_valid() and user_serializer.is_valid():
            user_serializer.save()
            serializer.save()
            new_org = self.get_object(pk=pk)
            new_org_serializer = OrganizationSerializer(instance=new_org)

            return Response(new_org_serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        organization = self.get_object(pk)
        organization.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class OrganizationEmailAPIView(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, *args, **kwargs):
        email = self.kwargs.get("email")
        organization = Organization.objects.filter(user__email=email).first()
        if organization:
            serialized_org = OrganizationSerializer(instance=organization)
            return Response(serialized_org.data)
        return Response({organization: {}})


class OrganizationListAPIView(APIView):
    """List all organizations or create a new one"""

    def get(self, request):
        orgList = Organization.objects.all()
        serializer = OrganizationSerializer(orgList, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = OrganizationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class TextToPdf(APIView):
    """Generate text from pdf"""

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        parser_classes = (MultiPartParser,)
        result = {}
        file = request.data.get("file")
        pdf_reader = PdfReader(file)
        for page in pdf_reader.pages:
            text = page.extract_text(extraction_mode="layout")
            result[page.page_number] = text

        if result != {}:
            return Response(result)
        else:
            return Response(
                {"message": "Text generation failed"},
                status=status.HTTP_400_BAD_REQUEST,
            )


class UploadTermsOfService(APIView):
    """Upload a terms of service file"""

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        parser_classes = (MultiPartParser,)

        serializer = UploadFileSerializer(data=request.data)
        if serializer.is_valid():
            organizationId = self.kwargs.get("id")
            item_name = serializer.validated_data.pop("name")
            file = serializer.validated_data.pop("file")
            description = serializer.validated_data.pop("description")

            terms_of_service = save_terms_of_service(
                organization_id=organizationId,
                file=file,
                terms_of_service_name=item_name,
                description=description,
            )

            if terms_of_service:
                return Response(terms_of_service, status.HTTP_201_CREATED)
            else:
                return Response(
                    {"message": "Upload failed"},
                    status=status.HTTP_400_BAD_REQUEST,
                )


class UploadLogo(APIView):
    """Upload a logo"""

    permission_classes = (IsAuthenticated,)

    def post(self, request, *args, **kwargs):
        parser_classes = (MultiPartParser,)

        serializer = UploadFileSerializer(data=request.data)
        if serializer.is_valid():
            organizationId = self.kwargs.get("id")
            file = serializer.validated_data.pop("file")

            org = Organization.objects.get(id=organizationId)
            storage = Operate(org.user.first_name)

            bucket_name = (
                org.bucket_name
                if org.bucket_name != ""
                else storage.create_bucket()
            )

            item_name = f"company-logo-{datetime.datetime.now().strftime('%m-%d-%Y-%H-%M-%S')}"
            uploaded = storage.upload_file(
                bucket_name=bucket_name,
                item_name=item_name,
                file=file,
                is_tos=False,
            )

            if uploaded:
                logo_url = (
                    f"https://{bucket_name}.{COS_S3_ENDPOINT}/{item_name}"
                )
                org.logo_url = logo_url
                org.save()
                return Response(
                    {"message": "Logo uploaded"}, status.HTTP_201_CREATED
                )
            else:
                return Response(
                    {"message": "Upload failed"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
