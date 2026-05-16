<?php

declare(strict_types=1);

require __DIR__ . '/../vendor/autoload.php';

use Talko\Sdk\TalkoClient;

$apiKey = getenv('TALKO_API_KEY');
if ($apiKey === false || $apiKey === '') {
    throw new RuntimeException('Missing TALKO_API_KEY');
}

$talko = new TalkoClient(apiKey: $apiKey);

$conversations = $talko->conversations->list([
    'status' => 'OPEN',
    'limit' => 10,
]);

print_r($conversations);

$connectors = $talko->connectors->list();
print_r($connectors);
