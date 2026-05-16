<?php

declare(strict_types=1);

namespace Talko\Sdk\Resources;

use Talko\Sdk\HttpClient;

class ConnectorsResource
{
    public function __construct(private readonly HttpClient $client)
    {
    }

    public function list(): mixed
    {
        return $this->client->request('GET', '/me/connectors');
    }

    public function upsert(string $connectorType, array $payload): mixed
    {
        return $this->client->request('PUT', '/me/connectors/' . $connectorType, ['body' => $payload]);
    }

    public function disable(string $connectorType): mixed
    {
        return $this->client->request('DELETE', '/me/connectors/' . $connectorType);
    }
}
