import { verifyWebhookSignature } from '../src/webhooks';

export async function POST(request: Request): Promise<Response> {
  const secret = process.env.TALKO_WEBHOOK_SECRET;
  if (!secret) {
    return new Response('Missing TALKO_WEBHOOK_SECRET', { status: 500 });
  }

  const rawBody = await request.text();
  const signature = request.headers.get('x-talko-signature') ?? '';

  if (!verifyWebhookSignature(rawBody, signature, secret)) {
    return new Response('Invalid signature', { status: 401 });
  }

  const event = JSON.parse(rawBody) as { event: string; data: unknown; timestamp: string; tenantId: string };
  console.log('TalkO webhook event:', event.event, event.timestamp);

  return new Response(null, { status: 204 });
}
