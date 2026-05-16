<?php

declare(strict_types=1);

namespace Talko\Sdk\Resources;

use Talko\Sdk\HttpClient;

class ConversationsResource
{
    public function __construct(private readonly HttpClient $client)
    {
    }

    public function list(array $params = []): mixed
    {
        return $this->client->request('GET', '/conversations', ['query' => $params]);
    }

    public function get(string $conversationId): mixed
    {
        return $this->client->request('GET', '/conversations/' . $conversationId);
    }

    public function sendMessage(string $conversationId, array $payload): mixed
    {
        return $this->client->request('POST', '/conversations/' . $conversationId . '/messages', ['body' => $payload]);
    }

    public function update(string $conversationId, array $payload): mixed
    {
        return $this->client->request('PATCH', '/conversations/' . $conversationId, ['body' => $payload]);
    }

    public function close(string $conversationId): mixed
    {
        return $this->client->request('POST', '/conversations/' . $conversationId . '/close');
    }

    public function visitorContext(string $conversationId): mixed
    {
        return $this->client->request('GET', '/conversations/' . $conversationId . '/visitor-context');
    }

    public function join(string $conversationId): mixed
    {
        return $this->client->request('POST', '/conversations/' . $conversationId . '/join');
    }

    public function transfer(string $conversationId, array $payload): mixed
    {
        return $this->client->request('POST', '/conversations/' . $conversationId . '/transfer', ['body' => $payload]);
    }

    public function addNote(string $conversationId, array $payload): mixed
    {
        return $this->client->request('POST', '/conversations/' . $conversationId . '/notes', ['body' => $payload]);
    }
}
