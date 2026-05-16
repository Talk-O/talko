# Resource Map

This map reflects the surfaces wrapped by the private SDK kit in this version.

## Conversations

- `GET /v1/conversations`
- `GET /v1/conversations/:id`
- `POST /v1/conversations/:id/messages`
- `PATCH /v1/conversations/:id`
- `POST /v1/conversations/:id/close`
- `GET /v1/conversations/:id/visitor-context`
- `POST /v1/conversations/:id/join`
- `POST /v1/conversations/:id/transfer`
- `POST /v1/conversations/:id/notes`

## Webhooks

- `GET /v1/webhooks`
- `POST /v1/webhooks`
- `PATCH /v1/webhooks/:id`
- `DELETE /v1/webhooks/:id`
- `POST /v1/webhooks/:id/rotate-secret`
- `GET /v1/me/webhooks/events`

## Connectors

- `GET /v1/me/connectors`
- `PUT /v1/me/connectors/:type`
- `DELETE /v1/me/connectors/:type`

## Workspace API keys

- `GET /v1/me/api-keys`
- `POST /v1/me/api-keys`
- `DELETE /v1/me/api-keys/:id`

## Workspace profile

- `GET /v1/me`
- `GET /v1/me/widget`
