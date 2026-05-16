import { TalkoHttpClient } from './client';
import { ApiKeysResource } from './resources/api-keys';
import { ConnectorsResource } from './resources/connectors';
import { ConversationsResource } from './resources/conversations';
import { WebhooksResource } from './resources/webhooks';
import { WorkspaceResource } from './resources/workspace';
import type { TalkoClientOptions } from './types';

export { TalkoError } from './errors';
export * from './types';
export { buildWebhookSignature, verifyWebhookSignature } from './webhooks';

export class TalkoClient {
  public readonly conversations: ConversationsResource;
  public readonly webhooks: WebhooksResource;
  public readonly connectors: ConnectorsResource;
  public readonly apiKeys: ApiKeysResource;
  public readonly workspace: WorkspaceResource;

  public constructor(options: TalkoClientOptions) {
    const http = new TalkoHttpClient(options);
    this.conversations = new ConversationsResource(http);
    this.webhooks = new WebhooksResource(http);
    this.connectors = new ConnectorsResource(http);
    this.apiKeys = new ApiKeysResource(http);
    this.workspace = new WorkspaceResource(http);
  }
}
