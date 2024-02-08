from django.contrib import admin

from .models import OrganizationUser


@admin.register(OrganizationUser)
class OrganizationUserAdmin(admin.ModelAdmin):
    pass
