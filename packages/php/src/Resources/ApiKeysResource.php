<?php

declare(strict_types=1);

namespace Talko\Sdk\Resources;

use Talko\Sdk\HttpClient;

class ApiKeysResource
{
    public function __construct(private readonly HttpClient $client)
    {
    }

    public function list(): mixed
    {
        return $this->client->request('GET', '/me/api-keys');
    }

    public function create(array $payload): mixed
    {
        return $this->client->request('POST', '/me/api-keys', ['body' => $payload]);
    }

    public function delete(string $apiKeyId): mixed
    {
        return $this->client->request('DELETE', '/me/api-keys/' . $apiKeyId);
    }
}
