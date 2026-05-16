from __future__ import annotations

import hashlib
import hmac


def _to_bytes(raw_body: bytes | str) -> bytes:
    if isinstance(raw_body, bytes):
        return raw_body
    return raw_body.encode("utf-8")


def build_webhook_signature(secret: str, raw_body: bytes | str) -> str:
    return hmac.new(secret.encode("utf-8"), _to_bytes(raw_body), hashlib.sha256).hexdigest()


def verify_webhook_signature(raw_body: bytes | str, signature: str, secret: str) -> bool:
    expected = build_webhook_signature(secret, raw_body)
    return hmac.compare_digest(expected, signature or "")
