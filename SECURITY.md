# Security

## Supported use

This SDK kit is intended for authenticated backend integrations with the managed TalkO cloud.

## Secrets handling

- Never commit TalkO API keys, JWTs, webhook secrets, or customer payload samples containing personal data.
- Keep credentials in environment variables or the customer secret manager.
- Rotate webhook secrets and API keys when a leak is suspected.

## Reporting

Report SDK or API security concerns through the TalkO support or security contact approved for the customer account.
