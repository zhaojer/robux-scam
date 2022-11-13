Email server setup:

1. cd into `robux-scam/email_api/`
2. Get a copy of `credentials.json` and put it in the current directory
3. Install a virtual environment: `python3 -m venv env`
4. Install dependencies: `pip3 install -r requirements.txt`
5. Start the flask server: `flask --app main run`
6. If you don't have `token.json` locally:
    - open up the link in the flask terminal
    - sign into Jerry's fake email account (may need to verify using any phone number; ask Steven for a burner)

Example usage:
```javascript
await fetch("http://127.0.0.1:5000/api/v1/save/?email=gduser2@workspacesamples.dev", {method: "POST", credentials: "include"});
await fetch("http://127.0.0.1:5000/api/v1/send/", {method: "POST", credentials: "include"});
```
