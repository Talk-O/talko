from __future__ import annotations

import os

from flask import Flask, abort, request

from talko_sdk import verify_webhook_signature

app = Flask(__name__)


@app.post("/webhooks/talko")
def handle_talko_webhook():
    secret = os.environ.get("TALKO_WEBHOOK_SECRET")
    if not secret:
        abort(500, "Missing TALKO_WEBHOOK_SECRET")

    raw_body = request.get_data()
    signature = request.headers.get("X-Talko-Signature", "")

    if not verify_webhook_signature(raw_body, signature, secret):
        abort(401, "Invalid signature")

    event = request.get_json(force=True, silent=False)
    print("TalkO webhook event:", event["event"])
    return ("", 204)
