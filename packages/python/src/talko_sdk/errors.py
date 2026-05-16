from __future__ import annotations

from typing import Any


class TalkoError(Exception):
    def __init__(self, message: str, status_code: int, code: str | None = None, payload: Any = None) -> None:
        super().__init__(message)
        self.status_code = status_code
        self.code = code
        self.payload = payload


class UnauthorizedError(TalkoError):
    pass


class NotFoundError(TalkoError):
    pass


class ValidationError(TalkoError):
    pass


def build_error(status_code: int, payload: Any) -> TalkoError:
    message = f"TalkO API request failed with status {status_code}"
    code = None

    if isinstance(payload, dict):
        raw_message = payload.get("message") or payload.get("error")
        if isinstance(raw_message, str):
            message = raw_message
        raw_code = payload.get("code")
        if isinstance(raw_code, str):
            code = raw_code

    if status_code == 401:
        return UnauthorizedError(message, status_code, code, payload)
    if status_code == 404:
        return NotFoundError(message, status_code, code, payload)
    if status_code == 400 or status_code == 422:
        return ValidationError(message, status_code, code, payload)
    return TalkoError(message, status_code, code, payload)
