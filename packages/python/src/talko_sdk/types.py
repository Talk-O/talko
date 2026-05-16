from __future__ import annotations

from typing import Any, Literal, NotRequired, TypedDict


WebhookEventName = Literal[
    "conversation:created",
    "conversation:resolved",
    "message:received",
    "ticket:created",
    "ticket:updated",
    "visitor:created",
]


class SendMessageInput(TypedDict, total=False):
    content: str
    sender: Literal["AGENT", "BOT", "SYSTEM"]
    metadata: dict[str, Any]


class UpdateConversationInput(TypedDict, total=False):
    status: str
    priority: str
    subject: str | None
    assignedAgentId: str | None
    teamId: str | None
    tags: list[str]


class CreateWebhookInput(TypedDict):
    url: str
    events: list[WebhookEventName]


class UpdateWebhookInput(TypedDict, total=False):
    url: str
    events: list[WebhookEventName]
    isActive: bool


class CreateApiKeyInput(TypedDict, total=False):
    name: str
    scopes: list[str]
    expiresAt: NotRequired[str]
