import { createHmac, timingSafeEqual } from 'node:crypto';

export function buildWebhookSignature(secret: string, rawBody: string | Buffer): string {
  return createHmac('sha256', secret).update(rawBody).digest('hex');
}

export function verifyWebhookSignature(rawBody: string | Buffer, signature: string, secret: string): boolean {
  const expected = buildWebhookSignature(secret, rawBody);
  const left = Buffer.from(expected, 'utf8');
  const right = Buffer.from(signature ?? '', 'utf8');

  if (left.length !== right.length) {
    return false;
  }

  return timingSafeEqual(left, right);
}
