import type { TalkoHttpClient } from '../client';
import type { CreateWebhookInput, UpdateWebhookInput } from '../types';
export declare class WebhooksResource {
    private readonly client;
    constructor(client: TalkoHttpClient);
    list(): Promise<unknown>;
    create(input: CreateWebhookInput): Promise<unknown>;
    update(id: string, input: UpdateWebhookInput): Promise<unknown>;
    delete(id: string): Promise<void>;
    rotateSecret(id: string): Promise<unknown>;
    listEvents(): Promise<unknown>;
}
