import flask
from flask import Flask

import os.path

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


def gmail_send_message(service, receiver):
    """Create and send an email message
    Print the returned  message id
    Returns: Message object, including message id
    """
    try:
        message = EmailMessage()
        
        from datetime import datetime
        message.set_content(f'Current time is {str(datetime.now())}')

        message['To'] = receiver
        message['From'] = 'gduser2@workspacesamples.dev'
        message['Subject'] = 'Robux'

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


def create_and_send(receiver):
    try:
        # create gmail api client
        service = build('gmail', 'v1', credentials=CREDS)
        # send the message
        gmail_send_message(service, receiver)

    except HttpError as error:
        print(F'An error occurred: {error}')


app = Flask(__name__)
CREDS = get_creds()


@app.route("/email/", methods=['GET', 'POST'])
def email_api():
    print("Sending...")
    receiver = flask.request.args.get("receiver", type=str)
    
    response = flask.jsonify({})
    # suppress Same-Origin Policy browser warning (it will send regardless though)
    response.headers.add('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
    
    if not receiver:
        print("Did not send: needs non empty receiver")
        return response
    
    create_and_send(receiver)
    print("Sent")
    
    return response
