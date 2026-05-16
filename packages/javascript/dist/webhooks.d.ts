export declare function buildWebhookSignature(secret: string, rawBody: string | Buffer): string;
export declare function verifyWebhookSignature(rawBody: string | Buffer, signature: string, secret: string): boolean;
