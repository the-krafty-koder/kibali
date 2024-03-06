from django.apps import AppConfig


class ApiConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "api"

    def ready(self) -> None:
        from .token_updater import start, update_token

        update_token()
        start()
        return super().ready()
