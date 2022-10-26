import get_creds
import send_message

from googleapiclient.discovery import build
from googleapiclient.errors import HttpError

def main():
    creds = get_creds.get_creds()
    try:
        # create gmail api client
        service = build('gmail', 'v1', credentials=creds)
        # send the message
        send_message.gmail_send_message(service)
        
    except HttpError as error:
        print(F'An error occurred: {error}')

if __name__ == "__main__":
    main()
