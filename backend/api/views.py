from django.core.serializers import serialize
from django.http import Http404
from django.http.multipartparser import MultiPartParser
from core.cloud.config import create_client
from core.cloud.delete import delete_terms_of_service_versions
from core.cloud.save import save_terms_of_service
from core.cloud.operate import Operate
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import generics
from .models import (
    Organization,
    OrganizationProfile,
    TermsOfService,
    TermsOfServiceVersion,
)
from .serializers import (
    OrganizationProfileSerializer,
    OrganizationSerializer,
    TermsOfServiceSerializer,
    TermsOfServiceVersionSerializer,
    UploadTermsOfServiceSerializer,
)


class TermsOfServiceListAPIView(APIView):
    """List all terms of service or create a new one"""

    def get(self, request):
        tosList = TermsOfService.objects.all()
        serializer = TermsOfServiceSerializer(tosList, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TermsOfServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OrganizationProfileAPIView(
    generics.RetrieveUpdateDestroyAPIView,
):
    queryset = OrganizationProfile.objects.all()
    serializer_class = OrganizationProfileSerializer


class TermsOfServiceVersionAPIView(
    generics.RetrieveUpdateDestroyAPIView,
):
    queryset = TermsOfServiceVersion.objects.all()
    serializer_class = TermsOfServiceVersionSerializer

    def delete(self, request, pk):
        bucket_name = request.data.pop("bucket-name")
        version_name = request.data.pop("version-name")

        terms_of_service_version = TermsOfServiceVersion.objects.get(id=pk)
        cos_client = create_client()
        delete_terms_of_service_versions(
            cos_client, bucket_name, [version_name]
        )

        terms_of_service_version.delete()
        return Response({"terms_of_service_version": "null"})


class TermsOfServiceAPIView(
    generics.RetrieveUpdateDestroyAPIView,
):
    queryset = TermsOfService.objects.all()
    serializer_class = TermsOfServiceSerializer

    def delete(self, request, pk):
        terms_of_service = TermsOfService.objects.get(id=pk)
        ops = Operate(terms_of_service.organization.username)
        deleted = ops.delete_file(
            terms_of_service.organization.bucket_name,
            terms_of_service.version_paths(),
        )
        terms_of_service.delete()
        return Response(
            {"terms_of_service": terms_of_service.id, "versions": deleted}
        )


class OrganizationAPIView(
    generics.RetrieveUpdateDestroyAPIView,
):
    queryset = Organization.objects.all()
    serializer_class = OrganizationSerializer


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


class UploadTermsOfService(APIView):
    """Upload a terms of service file"""

    def post(self, request, *args, **kwargs):
        parser_classes = (MultiPartParser,)

        serializer = UploadTermsOfServiceSerializer(data=request.data)
        if serializer.is_valid():
            tos_id = self.kwargs.get("id")
            terms_of_service = TermsOfService.objects.get(id=tos_id)

            item_name = serializer.validated_data.pop("name")
            file = serializer.validated_data.pop("file")

            terms_of_service = save_terms_of_service(
                organization_id=terms_of_service.organization.id,
                terms_of_service_name=item_name,
                file=file,
            )

            return Response(terms_of_service)
