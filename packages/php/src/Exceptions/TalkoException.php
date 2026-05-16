<?php

declare(strict_types=1);

namespace Talko\Sdk\Exceptions;

use RuntimeException;

class TalkoException extends RuntimeException
{
    public function __construct(
        string $message,
        private readonly int $statusCode,
        private readonly ?string $errorCode = null,
        private readonly mixed $payload = null,
    ) {
        parent::__construct($message);
    }

    public function getStatusCode(): int
    {
        return $this->statusCode;
    }

    public function getErrorCode(): ?string
    {
        return $this->errorCode;
    }

    public function getPayload(): mixed
    {
        return $this->payload;
    }
}
