<?php

declare(strict_types=1);

namespace Talko\Sdk;

use InvalidArgumentException;
use Talko\Sdk\Resources\ApiKeysResource;
use Talko\Sdk\Resources\ConnectorsResource;
use Talko\Sdk\Resources\ConversationsResource;
use Talko\Sdk\Resources\WebhooksResource;
use Talko\Sdk\Resources\WorkspaceResource;

class TalkoClient
{
    public readonly ConversationsResource $conversations;
    public readonly WebhooksResource $webhooks;
    public readonly ConnectorsResource $connectors;
    public readonly ApiKeysResource $apiKeys;
    public readonly WorkspaceResource $workspace;

    public function __construct(
        ?string $apiKey = null,
        ?string $accessToken = null,
        string $baseUrl = 'https://api.gettalko.com/v1',
        int $timeout = 30,
    ) {
        $token = $apiKey ?? $accessToken;
        if ($token === null || $token === '') {
            throw new InvalidArgumentException('TalkoClient requires apiKey or accessToken');
        }

        $httpClient = new HttpClient($token, $baseUrl, $timeout);
        $this->conversations = new ConversationsResource($httpClient);
        $this->webhooks = new WebhooksResource($httpClient);
        $this->connectors = new ConnectorsResource($httpClient);
        $this->apiKeys = new ApiKeysResource($httpClient);
        $this->workspace = new WorkspaceResource($httpClient);
    }
}
