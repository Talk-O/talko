from __future__ import annotations

import json
from typing import Any, Mapping
from urllib import error, parse, request

from .errors import TalkoError, build_error


class _BaseResource:
    def __init__(self, client: "TalkoClient") -> None:
        self._client = client


class ConversationsResource(_BaseResource):
    def list(self, **params: Any) -> Any:
        return self._client.request("GET", "/conversations", query=params)

    def get(self, conversation_id: str) -> Any:
        return self._client.request("GET", f"/conversations/{conversation_id}")

    def send_message(self, conversation_id: str, payload: Mapping[str, Any]) -> Any:
        return self._client.request("POST", f"/conversations/{conversation_id}/messages", body=payload)

    def update(self, conversation_id: str, payload: Mapping[str, Any]) -> Any:
        return self._client.request("PATCH", f"/conversations/{conversation_id}", body=payload)

    def close(self, conversation_id: str) -> Any:
        return self._client.request("POST", f"/conversations/{conversation_id}/close")

    def visitor_context(self, conversation_id: str) -> Any:
        return self._client.request("GET", f"/conversations/{conversation_id}/visitor-context")

    def join(self, conversation_id: str) -> Any:
        return self._client.request("POST", f"/conversations/{conversation_id}/join")

    def transfer(self, conversation_id: str, payload: Mapping[str, Any]) -> Any:
        return self._client.request("POST", f"/conversations/{conversation_id}/transfer", body=payload)

    def add_note(self, conversation_id: str, payload: Mapping[str, Any]) -> Any:
        return self._client.request("POST", f"/conversations/{conversation_id}/notes", body=payload)


class WebhooksResource(_BaseResource):
    def list(self) -> Any:
        return self._client.request("GET", "/webhooks")

    def create(self, payload: Mapping[str, Any]) -> Any:
        return self._client.request("POST", "/webhooks", body=payload)

    def update(self, webhook_id: str, payload: Mapping[str, Any]) -> Any:
        return self._client.request("PATCH", f"/webhooks/{webhook_id}", body=payload)

    def delete(self, webhook_id: str) -> Any:
        return self._client.request("DELETE", f"/webhooks/{webhook_id}")

    def rotate_secret(self, webhook_id: str) -> Any:
        return self._client.request("POST", f"/webhooks/{webhook_id}/rotate-secret")

    def list_events(self) -> Any:
        return self._client.request("GET", "/me/webhooks/events")


class ConnectorsResource(_BaseResource):
    def list(self) -> Any:
        return self._client.request("GET", "/me/connectors")

    def upsert(self, connector_type: str, payload: Mapping[str, Any]) -> Any:
        return self._client.request("PUT", f"/me/connectors/{connector_type}", body=payload)

    def disable(self, connector_type: str) -> Any:
        return self._client.request("DELETE", f"/me/connectors/{connector_type}")


class ApiKeysResource(_BaseResource):
    def list(self) -> Any:
        return self._client.request("GET", "/me/api-keys")

    def create(self, payload: Mapping[str, Any]) -> Any:
        return self._client.request("POST", "/me/api-keys", body=payload)

    def delete(self, api_key_id: str) -> Any:
        return self._client.request("DELETE", f"/me/api-keys/{api_key_id}")


class WorkspaceResource(_BaseResource):
    def profile(self) -> Any:
        return self._client.request("GET", "/me")

    def widget(self) -> Any:
        return self._client.request("GET", "/me/widget")


class TalkoClient:
    def __init__(
        self,
        *,
        api_key: str | None = None,
        access_token: str | None = None,
        base_url: str = "https://api.gettalko.com/v1",
        timeout: float = 30.0,
    ) -> None:
        token = api_key or access_token
        if not token:
            raise ValueError("TalkoClient requires api_key or access_token")

        self._token = token
        self._base_url = base_url.rstrip("/")
        self._timeout = timeout

        self.conversations = ConversationsResource(self)
        self.webhooks = WebhooksResource(self)
        self.connectors = ConnectorsResource(self)
        self.api_keys = ApiKeysResource(self)
        self.workspace = WorkspaceResource(self)

    def request(
        self,
        method: str,
        path: str,
        *,
        query: Mapping[str, Any] | None = None,
        body: Mapping[str, Any] | None = None,
        headers: Mapping[str, str] | None = None,
    ) -> Any:
        url = self._build_url(path, query)
        payload = json.dumps(body).encode("utf-8") if body is not None else None

        request_headers = {
            "Authorization": f"Bearer {self._token}",
            "Accept": "application/json",
        }
        if payload is not None:
            request_headers["Content-Type"] = "application/json"
        if headers is not None:
            request_headers.update(headers)

        http_request = request.Request(url, data=payload, method=method, headers=request_headers)

        try:
            with request.urlopen(http_request, timeout=self._timeout) as response:
                raw_body = response.read().decode("utf-8")
                if not raw_body:
                    return None
                return json.loads(raw_body)
        except error.HTTPError as exc:
            raw_body = exc.read().decode("utf-8")
            parsed_body: Any = None
            if raw_body:
                try:
                    parsed_body = json.loads(raw_body)
                except json.JSONDecodeError:
                    parsed_body = {"error": raw_body}
            raise build_error(exc.code, parsed_body) from exc
        except error.URLError as exc:
            raise TalkoError(str(exc.reason), 500, "CLIENT_ERROR") from exc

    def _build_url(self, path: str, query: Mapping[str, Any] | None) -> str:
        normalized_path = path if path.startswith("/") else f"/{path}"
        url = f"{self._base_url}{normalized_path}"
        if not query:
            return url

        filtered_query = {
            key: value
            for key, value in query.items()
            if value is not None and value != ""
        }
        if not filtered_query:
            return url

        return f"{url}?{parse.urlencode(filtered_query)}"
