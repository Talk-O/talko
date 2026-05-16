# PHP Reference Client

This package is the private PHP reference client for TalkO managed cloud integrations.

## Supported runtime

- PHP 8.1+

## Included surfaces

- Conversations
- Webhooks
- Connectors
- Workspace API keys
- Workspace profile helpers
- Webhook signature verification

## Local usage

```php
<?php

use Talko\Sdk\TalkoClient;

$talko = new TalkoClient(apiKey: getenv('TALKO_API_KEY'));
```

## Examples

- `examples/basic.php`
- `examples/laravel_webhook.php`
