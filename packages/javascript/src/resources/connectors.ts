import type { TalkoHttpClient } from '../client';
import type { ConnectorType } from '../types';

export class ConnectorsResource {
  public constructor(private readonly client: TalkoHttpClient) {}

  public list(): Promise<unknown> {
    return this.client.request('GET', '/me/connectors');
  }

  public upsert(type: ConnectorType, config: Record<string, unknown>): Promise<unknown> {
    return this.client.request('PUT', `/me/connectors/${type}`, { body: config });
  }

  public disable(type: ConnectorType): Promise<void> {
    return this.client.request('DELETE', `/me/connectors/${type}`);
  }
}
