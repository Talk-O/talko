# Webhook Signatures

TalkO signs webhook deliveries with `HMAC-SHA256` over the raw request body.

## Header

```http
X-Talko-Signature: <hex-digest>
```

## Canonical algorithm

1. Read the raw request body exactly as bytes.
2. Compute `HMAC-SHA256(secret, rawBody)`.
3. Compare the resulting hex digest with the `X-Talko-Signature` header using a timing-safe comparison.

## Important implementation note

Do not prepend `sha256=` to the expected digest. The current TalkO backend sends the signature as a plain hex string.
