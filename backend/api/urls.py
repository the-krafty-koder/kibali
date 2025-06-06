from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from .views import (
    OrganizationAPIView,
    OrganizationEmailAPIView,
    OrganizationListAPIView,
    TermsOfServiceAPIView,
    TermsOfServiceListAPIView,
    TermsOfServiceVersionAPIView,
    TextToPdf,
    UploadLogo,
    UploadTermsOfService,
    # GetSignedUrl,
)

urlpatterns = [
    path("organizations", OrganizationListAPIView.as_view()),
    path("organizations/<int:pk>", OrganizationAPIView.as_view()),
    path(
        "organization-from-email/<str:email>",
        OrganizationEmailAPIView.as_view(),
    ),
    path(
        "terms-of-service-version/<int:pk>",
        TermsOfServiceVersionAPIView.as_view(),
    ),
    path(
        "terms-of-service/<int:id>",
        TermsOfServiceListAPIView.as_view(),
    ),
    path("terms-of-service/<str:slug>", TermsOfServiceAPIView.as_view()),
    path("terms-of-service/<int:id>/upload", UploadTermsOfService.as_view()),
    path("organizations/<int:id>/upload-logo", UploadLogo.as_view()),
    # path(
    #     "organizations/:id/get-signed-url/:bucket_name/:object_name",
    #     GetSignedUrl.as_view(),
    # ),
    path(
        "login",
        obtain_auth_token,
    ),
    path(
        "generate-text",
        TextToPdf.as_view(),
    ),
]
