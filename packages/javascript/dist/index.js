import { TalkoHttpClient } from './client';
import { ApiKeysResource } from './resources/api-keys';
import { ConnectorsResource } from './resources/connectors';
import { ConversationsResource } from './resources/conversations';
import { WebhooksResource } from './resources/webhooks';
import { WorkspaceResource } from './resources/workspace';
export { TalkoError } from './errors';
export * from './types';
export { buildWebhookSignature, verifyWebhookSignature } from './webhooks';
export class TalkoClient {
    conversations;
    webhooks;
    connectors;
    apiKeys;
    workspace;
    constructor(options) {
        const http = new TalkoHttpClient(options);
        this.conversations = new ConversationsResource(http);
        this.webhooks = new WebhooksResource(http);
        this.connectors = new ConnectorsResource(http);
        this.apiKeys = new ApiKeysResource(http);
        this.workspace = new WorkspaceResource(http);
    }
}
