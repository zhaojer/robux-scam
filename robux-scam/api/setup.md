Email server setup:

1. cd into `robux-scam/api/`
2. Get a copy of `credentials.json` and put it in the current directory
3. Install a virtual environment: `python3 -m venv env`
4. Install dependencies: `pip3 install -r requirements.txt`
5. Start the flask server: `flask --app email_api run`
6. If you don't have `token.json` locally:
    - open up the link in the flask terminal
    - sign into Jerry's fake email account (may need to verify using any phone number; ask Steven for a burner)

Now you should be able use the api like this to send an email:
`fetch("http://127.0.0.1:5000/email/?receiver=gduser2@workspacesamples.dev")`
