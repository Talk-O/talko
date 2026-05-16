<?php

declare(strict_types=1);

namespace Talko\Sdk;

use JsonException;
use Talko\Sdk\Exceptions\NotFoundException;
use Talko\Sdk\Exceptions\TalkoException;
use Talko\Sdk\Exceptions\UnauthorizedException;
use Talko\Sdk\Exceptions\ValidationException;

class HttpClient
{
    public function __construct(
        private readonly string $token,
        private readonly string $baseUrl = 'https://api.gettalko.com/v1',
        private readonly int $timeout = 30,
    ) {
    }

    public function request(string $method, string $path, array $options = []): mixed
    {
        $url = $this->buildUrl($path, $options['query'] ?? []);
        $headers = [
            'Authorization: Bearer ' . $this->token,
            'Accept: application/json',
        ];

        $body = null;
        if (array_key_exists('body', $options) && $options['body'] !== null) {
            try {
                $body = json_encode($options['body'], JSON_THROW_ON_ERROR);
            } catch (JsonException $exception) {
                throw new TalkoException('Failed to encode request body', 500, 'CLIENT_ERROR', $options['body']);
            }

            $headers[] = 'Content-Type: application/json';
        }

        foreach (($options['headers'] ?? []) as $name => $value) {
            $headers[] = $name . ': ' . $value;
        }

        $handle = curl_init($url);
        if ($handle === false) {
            throw new TalkoException('Failed to initialize cURL', 500, 'CLIENT_ERROR');
        }

        curl_setopt_array($handle, [
            CURLOPT_CUSTOMREQUEST => $method,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_TIMEOUT => $this->timeout,
            CURLOPT_POSTFIELDS => $body,
            CURLOPT_HEADER => false,
        ]);

        $rawBody = curl_exec($handle);
        if ($rawBody === false) {
            $error = curl_error($handle);
            curl_close($handle);
            throw new TalkoException($error !== '' ? $error : 'cURL request failed', 500, 'CLIENT_ERROR');
        }

        $statusCode = (int) curl_getinfo($handle, CURLINFO_RESPONSE_CODE);
        curl_close($handle);

        $parsed = null;
        if ($rawBody !== '') {
            try {
                $parsed = json_decode($rawBody, true, 512, JSON_THROW_ON_ERROR);
            } catch (JsonException) {
                $parsed = ['error' => $rawBody];
            }
        }

        if ($statusCode >= 400) {
            $this->throwForStatus($statusCode, $parsed);
        }

        return $parsed;
    }

    private function buildUrl(string $path, array $query): string
    {
        $normalizedPath = str_starts_with($path, '/') ? $path : '/' . $path;
        $url = rtrim($this->baseUrl, '/') . $normalizedPath;

        $filtered = array_filter(
            $query,
            static fn (mixed $value): bool => $value !== null && $value !== ''
        );

        if ($filtered === []) {
            return $url;
        }

        return $url . '?' . http_build_query($filtered);
    }

    private function throwForStatus(int $statusCode, mixed $payload): never
    {
        $message = 'TalkO API request failed with status ' . $statusCode;
        $errorCode = null;

        if (is_array($payload)) {
            if (isset($payload['message']) && is_string($payload['message'])) {
                $message = $payload['message'];
            } elseif (isset($payload['error']) && is_string($payload['error'])) {
                $message = $payload['error'];
            }

            if (isset($payload['code']) && is_string($payload['code'])) {
                $errorCode = $payload['code'];
            }
        }

        if ($statusCode === 401) {
            throw new UnauthorizedException($message, $statusCode, $errorCode, $payload);
        }
        if ($statusCode === 404) {
            throw new NotFoundException($message, $statusCode, $errorCode, $payload);
        }
        if ($statusCode === 400 || $statusCode === 422) {
            throw new ValidationException($message, $statusCode, $errorCode, $payload);
        }

        throw new TalkoException($message, $statusCode, $errorCode, $payload);
    }
}
