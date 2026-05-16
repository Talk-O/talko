import type { TalkoHttpClient } from '../client';
import type { CreateWebhookInput, UpdateWebhookInput } from '../types';

export class WebhooksResource {
  public constructor(private readonly client: TalkoHttpClient) {}

  public list(): Promise<unknown> {
    return this.client.request('GET', '/webhooks');
  }

  public create(input: CreateWebhookInput): Promise<unknown> {
    return this.client.request('POST', '/webhooks', { body: input });
  }

  public update(id: string, input: UpdateWebhookInput): Promise<unknown> {
    return this.client.request('PATCH', `/webhooks/${id}`, { body: input });
  }

  public delete(id: string): Promise<void> {
    return this.client.request('DELETE', `/webhooks/${id}`);
  }

  public rotateSecret(id: string): Promise<unknown> {
    return this.client.request('POST', `/webhooks/${id}/rotate-secret`);
  }

  public listEvents(): Promise<unknown> {
    return this.client.request('GET', '/me/webhooks/events');
  }
}
