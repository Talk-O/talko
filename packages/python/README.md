# Python Reference Client

This package is the private Python reference client for TalkO managed cloud integrations.

## Supported runtime

- Python 3.10+

## Included surfaces

- Conversations
- Webhooks
- Connectors
- Workspace API keys
- Workspace profile helpers
- Webhook signature verification

## Local usage

```python
from talko_sdk import TalkoClient

client = TalkoClient(api_key="gt_live_your_key")
```

## Examples

- `examples/basic.py`
- `examples/flask_webhook.py`
