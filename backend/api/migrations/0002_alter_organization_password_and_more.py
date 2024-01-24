# Generated by Django 4.2.9 on 2024-01-24 08:21

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("api", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="organization",
            name="password",
            field=models.TextField(unique=True),
        ),
        migrations.AlterField(
            model_name="organization",
            name="username",
            field=models.CharField(unique=True),
        ),
        migrations.AlterField(
            model_name="organizationprofile",
            name="email",
            field=models.EmailField(max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name="organizationprofile",
            name="name",
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
