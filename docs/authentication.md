# Authentication Guide

## Supported credentials

The current backend supports these integration-safe credentials:

- `gt_live_...` API keys created through `POST /v1/me/api-keys`.
- JWT bearer tokens returned by `POST /v1/auth/login`.

## Recommended usage

- Use API keys for backend-to-backend integrations, jobs, and webhook setup.
- Use JWT tokens only when acting on behalf of an authenticated TalkO operator session.

## Header format

```http
Authorization: Bearer gt_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

## Key management

- Store the raw key only once when it is created.
- Treat `keyPrefix` as display-only metadata.
- Prefer short-lived keys or rotation procedures for higher-risk customers.
