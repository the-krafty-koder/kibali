import pytest, requests, logging
from api.token_updater import update_token


class TestTokenUpdater:
    # @pytest.mark.django_db
    # def test_token_is_returned(self):
    #     data = update_token()
    #     print(data)

    #     assert data == {}

    def test_update_object(self):
        endpoint = "https://s3.us.cloud-object-storage.appdomain.cloud/test103-tos-bucket/test103-version-1?acl"
        token = "eyJraWQiOiIyMDI0MDIwNTA4MzgiLCJhbGciOiJSUzI1NiJ9.eyJpYW1faWQiOiJpYW0tU2VydmljZUlkLWM3ODFmYmIzLTUxMjYtNDYzNy1iYjU1LWI3MjQ4MGY5ZjIzMyIsImlkIjoiaWFtLVNlcnZpY2VJZC1jNzgxZmJiMy01MTI2LTQ2MzctYmI1NS1iNzI0ODBmOWYyMzMiLCJyZWFsbWlkIjoiaWFtIiwianRpIjoiMmRlMzdiMTEtOWJkYi00OWQxLTgxODUtNjBhOTY1OGYzNWY1IiwiaWRlbnRpZmllciI6IlNlcnZpY2VJZC1jNzgxZmJiMy01MTI2LTQ2MzctYmI1NS1iNzI0ODBmOWYyMzMiLCJuYW1lIjoidG9zLXNlcnZpY2UtY3JlZGVudGlhbHMiLCJzdWIiOiJTZXJ2aWNlSWQtYzc4MWZiYjMtNTEyNi00NjM3LWJiNTUtYjcyNDgwZjlmMjMzIiwic3ViX3R5cGUiOiJTZXJ2aWNlSWQiLCJhdXRobiI6eyJzdWIiOiJTZXJ2aWNlSWQtYzc4MWZiYjMtNTEyNi00NjM3LWJiNTUtYjcyNDgwZjlmMjMzIiwiaWFtX2lkIjoiaWFtLVNlcnZpY2VJZC1jNzgxZmJiMy01MTI2LTQ2MzctYmI1NS1iNzI0ODBmOWYyMzMiLCJzdWJfdHlwZSI6IlNlcnZpY2VJZCIsIm5hbWUiOiJ0b3Mtc2VydmljZS1jcmVkZW50aWFscyJ9LCJhY2NvdW50Ijp7InZhbGlkIjp0cnVlLCJic3MiOiI2ZmM5MzExN2JlYjk0MzhhOGY4NTRlMmYxNzZkZDM0OCIsImZyb3plbiI6dHJ1ZX0sImlhdCI6MTcwOTczNjgxOSwiZXhwIjoxNzA5NzQwNDE5LCJpc3MiOiJodHRwczovL2lhbS5jbG91ZC5pYm0uY29tL2lkZW50aXR5IiwiZ3JhbnRfdHlwZSI6InVybjppYm06cGFyYW1zOm9hdXRoOmdyYW50LXR5cGU6YXBpa2V5Iiwic2NvcGUiOiJpYm0gb3BlbmlkIiwiY2xpZW50X2lkIjoiZGVmYXVsdCIsImFjciI6MSwiYW1yIjpbInB3ZCJdfQ.VR0X1BGAEK974UFok7xtR2S5AbJV41RqgHHvaVyPksckDWlsY2g_w8XRMV0ZqPuwAnsl0zkJZbgmWRX7qhQj1kMB_5gp7NM1mSDmzQH_H-CK5f5hjxdUoIyFEj2VbhawgRFmJWmi2jV8pRFvLgFv9cza4tkHTyxvfyUwJyefLGj8q3EyzGX89rxUGCKSpW7KnZIbvRfSfvsAgSa7T1zzxIcVAyP25d6CMRWhjaVc5OkNlrKFT4zOswNMzAki59qyk4rn-J_c6uhBCmOjo5U13ewhYILNSM1YOGK9rTnN3ZxAprOmnsvRQ6e-8df_lYsquIl3TAiioZvkZ5KzMN619A"
        response = requests.put(
            url=endpoint,
            headers={
                "Authorization": f"Bearer {token}",
                "x-amz-acl": "public-read",
            },
        )
        print(response.content)
        logging.log(level=logging.INFO, msg=response.content)
        assert response.content == {}
