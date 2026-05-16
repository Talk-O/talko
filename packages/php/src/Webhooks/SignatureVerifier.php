<?php

declare(strict_types=1);

namespace Talko\Sdk\Webhooks;

final class SignatureVerifier
{
    public static function build(string $secret, string $rawBody): string
    {
        return hash_hmac('sha256', $rawBody, $secret);
    }

    public static function verify(string $rawBody, string $signature, string $secret): bool
    {
        return hash_equals(self::build($secret, $rawBody), $signature);
    }
}
