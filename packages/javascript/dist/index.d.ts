import { ApiKeysResource } from './resources/api-keys';
import { ConnectorsResource } from './resources/connectors';
import { ConversationsResource } from './resources/conversations';
import { WebhooksResource } from './resources/webhooks';
import { WorkspaceResource } from './resources/workspace';
import type { TalkoClientOptions } from './types';
export { TalkoError } from './errors';
export * from './types';
export { buildWebhookSignature, verifyWebhookSignature } from './webhooks';
export declare class TalkoClient {
    readonly conversations: ConversationsResource;
    readonly webhooks: WebhooksResource;
    readonly connectors: ConnectorsResource;
    readonly apiKeys: ApiKeysResource;
    readonly workspace: WorkspaceResource;
    constructor(options: TalkoClientOptions);
}
