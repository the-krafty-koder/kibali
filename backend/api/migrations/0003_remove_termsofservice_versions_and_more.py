# Generated by Django 4.2.9 on 2024-01-24 10:33

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0002_alter_organization_password_and_more"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="termsofservice",
            name="versions",
        ),
        migrations.AddField(
            model_name="termsofservice",
            name="versions",
            field=models.ManyToManyField(to="api.termsofserviceversion"),
        ),
    ]
