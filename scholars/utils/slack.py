from django.conf import settings
from slackclient import SlackClient


class Slack:
    sc = None

    def __init__(self):
        slack_token = settings.SLACK_OAUTH_ACCESS_TOKEN
        self.sc = SlackClient(slack_token)

    def create_channel(self, name):
        return self.sc.api_call(
            "chat.create",
            name=name,
            validate=True
        )
