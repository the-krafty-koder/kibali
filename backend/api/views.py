from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework import mixins
from rest_framework import generics
from .models import Organization, TermsOfService
from .serializers import OrganizationSerializer, TermsOfServiceSerializer


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


class TermsOfServiceAPIView(
    generics.RetrieveUpdateDestroyAPIView,
):
    queryset = TermsOfService.objects.all()
    serializer_class = TermsOfServiceSerializer


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
