from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import (
    OrganizationAPIView,
    # OrganizationProfileAPIView,
    OrganizationListAPIView,
    TermsOfServiceAPIView,
    TermsOfServiceListAPIView,
    TermsOfServiceVersionAPIView,
    UploadTermsOfService,
)

urlpatterns = [
    path("organizations", OrganizationListAPIView.as_view()),
    path("organizations/<int:pk>", OrganizationAPIView.as_view()),
    path(
        "terms-of-service-version/<int:pk>",
        TermsOfServiceVersionAPIView.as_view(),
    ),
    path("terms-of-service", TermsOfServiceListAPIView.as_view()),
    path("terms-of-service/<int:pk>", TermsOfServiceAPIView.as_view()),
    path("terms-of-service/<int:id>/upload", UploadTermsOfService.as_view()),
    path(
        "auth-token",
        obtain_auth_token,
    ),
]
