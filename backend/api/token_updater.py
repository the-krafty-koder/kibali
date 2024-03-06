import requests
import logging
from apscheduler.schedulers.background import BackgroundScheduler
from core.cloud.config import COS_API_KEY, COS_IAM_ENDPOINT
from api.models import IAMToken


def update_token():
    print("Called")
    db_token = IAMToken.objects.all().first()

    response = requests.post(
        url=COS_IAM_ENDPOINT,
        headers={
            "Accept": "application/json",
        },
        data={
            "apikey": COS_API_KEY,
            "response_type": "cloud_iam",
            "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
        },
    )
    token = response.json().get("access_token")
    if db_token:
        db_token.token = token
        db_token.save()
    else:
        IAMToken.objects.create(token=token)

    print(token)
    return token


def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(update_token, "interval", minutes=60)
    scheduler.start()
