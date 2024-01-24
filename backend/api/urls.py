from django.urls import path
from .views import (
    OrganizationAPIView,
    OrganizationListAPIView,
    TermsOfServiceAPIView,
    TermsOfServiceListAPIView,
)

urlpatterns = [
    path("terms_of_service_list/", TermsOfServiceListAPIView.as_view()),
    path("terms_of_service/<int:pk>", TermsOfServiceAPIView.as_view()),
    path("organization/<int:pk>", OrganizationAPIView.as_view()),
    path("organizations/", OrganizationListAPIView.as_view()),
]
