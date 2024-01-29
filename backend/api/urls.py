from django.urls import path
from .views import (
    OrganizationAPIView,
    OrganizationProfileAPIView,
    OrganizationListAPIView,
    TermsOfServiceAPIView,
    TermsOfServiceListAPIView,
    UploadTermsOfService,
)

urlpatterns = [
    path("terms-of-service-list", TermsOfServiceListAPIView.as_view()),
    path("terms-of-service/<int:pk>", TermsOfServiceAPIView.as_view()),
    path("organization/<int:pk>", OrganizationAPIView.as_view()),
    path("organizations", OrganizationListAPIView.as_view()),
    path("organization-profile/<int:pk>", OrganizationProfileAPIView.as_view()),
    path("organization/<int:id>/upload", UploadTermsOfService.as_view()),
]
