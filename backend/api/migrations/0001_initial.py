# Generated by Django 4.2.9 on 2024-01-29 13:15

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Organization",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("username", models.CharField(unique=True)),
                ("password", models.TextField(unique=True)),
                ("storage_created", models.BooleanField(default=False)),
            ],
        ),
        migrations.CreateModel(
            name="OrganizationProfile",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField(max_length=50, unique=True)),
                ("email", models.EmailField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="TermsOfServiceVersion",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("version_number", models.IntegerField()),
                ("share_url", models.URLField()),
                ("storage_url", models.URLField()),
                (
                    "created_at",
                    models.DateTimeField(
                        default=datetime.datetime(
                            2024,
                            1,
                            29,
                            13,
                            15,
                            11,
                            448351,
                            tzinfo=datetime.timezone.utc,
                        )
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="TermsOfService",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("name", models.CharField()),
                (
                    "created_at",
                    models.DateTimeField(
                        default=datetime.datetime(
                            2024,
                            1,
                            29,
                            13,
                            15,
                            11,
                            449311,
                            tzinfo=datetime.timezone.utc,
                        )
                    ),
                ),
                (
                    "organization",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to="api.organization",
                    ),
                ),
                ("versions", models.ManyToManyField(to="api.termsofserviceversion")),
            ],
        ),
        migrations.AddField(
            model_name="organization",
            name="profile",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE,
                to="api.organizationprofile",
            ),
        ),
    ]
