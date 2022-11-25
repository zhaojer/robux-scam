import flask

import collections
import os.path
import urllib.parse
import uuid

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
import base64
from email.message import EmailMessage
from googleapiclient.errors import HttpError


# If modifying these scopes, delete the file token.json.
# SCOPES = ['https://www.googleapis.com/auth/gmail.readonly']
SCOPES = ['https://www.googleapis.com/auth/gmail.compose']


class DatabaseEntry:
    def __init__(self, name=None, email=None) -> None:
        self.name = name
        self.email = email


DATABASE = collections.defaultdict(DatabaseEntry)  # lol


EMAIL_BODY = ""
with open("email_body.txt", "r") as file:
    EMAIL_BODY = file.read()


def get_creds():
    creds = None
    # The file token.json stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.json', 'w') as token:
            token.write(creds.to_json())
    
    return creds


def gmail_send_message(service, receiver, receiver_name):
    """Create and send an email message
    Print the returned  message id
    Returns: Message object, including message id
    """
    try:
        message = EmailMessage()

        if receiver_name is None or receiver_name == "":
            salutation = "To whomever it may concern,"
        else:
            salutation = f"Dear {receiver_name},"

        message_content = f"{salutation}\n\n{EMAIL_BODY}"
        
        message.set_content(message_content)

        message['To'] = receiver
        message['From'] = 'The Robux Scam Team'
        message['Subject'] = 'Your Child & Scam Safety'

        # encoded message
        encoded_message = base64.urlsafe_b64encode(message.as_bytes()) \
            .decode()

        create_message = {
            'raw': encoded_message
        }
        # pylint: disable=E1101
        send_message = (service.users().messages().send
                        (userId="me", body=create_message).execute())
        print(F'Message Id: {send_message["id"]}')
    except HttpError as error:
        print(F'An error occurred: {error}')
        send_message = None
    return send_message


def send_email(receiver, receiver_name):
    try:
        # create gmail api client
        service = build('gmail', 'v1', credentials=CREDS)
        # send the message
        gmail_send_message(service, receiver, receiver_name)

    except HttpError as error:
        print(F'An error occurred: {error}')


def set_email(cookie, email):
    DATABASE[cookie].email = email


def get_email(cookie):
    return DATABASE[cookie].email


def set_name(cookie, name):
    DATABASE[cookie].name = name


def get_name(cookie):
    return DATABASE[cookie].name


CREDS = get_creds()
app = flask.Flask(__name__)


@app.route("/api/v1/save/", methods=['POST'])
def save_email_route():
    receiver = flask.request.args.get("email", type=str)
    receiver_name = flask.request.args.get("name", type=str)
    if receiver_name is not None:
        receiver_name = urllib.parse.unquote(receiver_name)
    
    response = flask.jsonify({})
    # suppress Same-Origin Policy browser warning (it will send regardless though)
    response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    response.headers.add('Access-Control-Allow-Credentials', 'true')

    if not receiver:
        print("Did not send: needs non empty receiver address")
        return response, 400

    cookie = str(uuid.uuid4())
    response.set_cookie("client-id", cookie)
    set_email(cookie, receiver)
    set_name(cookie, receiver_name)

    return response

@app.route("/api/v1/send/", methods=['POST'])
def send_email_route():
    print("Sending...")
    receiver = flask.request.args.get("receiver", type=str)
    
    response = flask.jsonify({})
    # suppress Same-Origin Policy browser warning (it will send regardless though)
    response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    
    cookie = flask.request.cookies.get('client-id')
    if cookie is None:
        print("Cannot find saved email address")
        return response, 400
    
    receiver = get_email(cookie)
    receiver_name = get_name(cookie)
    
    send_email(receiver, receiver_name)
    print("Sent")
    
    return response
