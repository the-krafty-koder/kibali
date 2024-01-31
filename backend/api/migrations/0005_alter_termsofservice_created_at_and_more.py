# Generated by Django 4.2.9 on 2024-01-30 09:59

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0004_remove_termsofserviceversion_storage_url_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="termsofservice",
            name="created_at",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 1, 30, 9, 59, 18, 356043, tzinfo=datetime.timezone.utc
                )
            ),
        ),
        migrations.AlterField(
            model_name="termsofserviceversion",
            name="created_at",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 1, 30, 9, 59, 18, 355294, tzinfo=datetime.timezone.utc
                )
            ),
        ),
        migrations.AlterField(
            model_name="termsofserviceversion",
            name="share_url",
            field=models.URLField(blank=True),
        ),
    ]
