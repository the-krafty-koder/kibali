# Generated by Django 4.2.9 on 2024-02-22 08:16

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0005_termsofservice_description_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="termsofservice",
            name="created_at",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 2, 22, 8, 16, 23, 747474, tzinfo=datetime.timezone.utc
                )
            ),
        ),
        migrations.AlterField(
            model_name="termsofservice",
            name="description",
            field=models.CharField(blank=True, default=""),
        ),
        migrations.AlterField(
            model_name="termsofserviceversion",
            name="created_at",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 2, 22, 8, 16, 23, 746688, tzinfo=datetime.timezone.utc
                )
            ),
        ),
    ]
