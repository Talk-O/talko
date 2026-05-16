<?php

declare(strict_types=1);

namespace Talko\Sdk\Resources;

use Talko\Sdk\HttpClient;

class WebhooksResource
{
    public function __construct(private readonly HttpClient $client)
    {
    }

    public function list(): mixed
    {
        return $this->client->request('GET', '/webhooks');
    }

    public function create(array $payload): mixed
    {
        return $this->client->request('POST', '/webhooks', ['body' => $payload]);
    }

    public function update(string $webhookId, array $payload): mixed
    {
        return $this->client->request('PATCH', '/webhooks/' . $webhookId, ['body' => $payload]);
    }

    public function delete(string $webhookId): mixed
    {
        return $this->client->request('DELETE', '/webhooks/' . $webhookId);
    }

    public function rotateSecret(string $webhookId): mixed
    {
        return $this->client->request('POST', '/webhooks/' . $webhookId . '/rotate-secret');
    }

    public function listEvents(): mixed
    {
        return $this->client->request('GET', '/me/webhooks/events');
    }
}
