<?php

declare(strict_types=1);

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Talko\Sdk\Webhooks\SignatureVerifier;

Route::post('/webhooks/talko', function (Request $request) {
    $secret = env('TALKO_WEBHOOK_SECRET');
    if (!$secret) {
        abort(500, 'Missing TALKO_WEBHOOK_SECRET');
    }

    $rawBody = $request->getContent();
    $signature = (string) $request->header('X-Talko-Signature', '');

    if (!SignatureVerifier::verify($rawBody, $signature, $secret)) {
        abort(401, 'Invalid signature');
    }

    $event = json_decode($rawBody, true, 512, JSON_THROW_ON_ERROR);
    logger()->info('TalkO webhook event received', ['event' => $event['event'] ?? null]);

    return response()->noContent();
});
