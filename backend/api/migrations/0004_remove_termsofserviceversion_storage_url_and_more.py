# Generated by Django 4.2.9 on 2024-01-30 09:56

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0003_alter_termsofservice_created_at_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="termsofserviceversion",
            name="storage_url",
        ),
        migrations.AddField(
            model_name="termsofserviceversion",
            name="storage_path",
            field=models.CharField(default=""),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="termsofservice",
            name="created_at",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 1, 30, 9, 56, 39, 441263, tzinfo=datetime.timezone.utc
                )
            ),
        ),
        migrations.AlterField(
            model_name="termsofserviceversion",
            name="created_at",
            field=models.DateTimeField(
                default=datetime.datetime(
                    2024, 1, 30, 9, 56, 39, 440472, tzinfo=datetime.timezone.utc
                )
            ),
        ),
    ]