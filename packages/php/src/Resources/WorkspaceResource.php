<?php

declare(strict_types=1);

namespace Talko\Sdk\Resources;

use Talko\Sdk\HttpClient;

class WorkspaceResource
{
    public function __construct(private readonly HttpClient $client)
    {
    }

    public function profile(): mixed
    {
        return $this->client->request('GET', '/me');
    }

    public function widget(): mixed
    {
        return $this->client->request('GET', '/me/widget');
    }
}
