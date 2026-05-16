import type { TalkoHttpClient } from '../client';
import type { CreateApiKeyInput } from '../types';

export class ApiKeysResource {
  public constructor(private readonly client: TalkoHttpClient) {}

  public list(): Promise<unknown> {
    return this.client.request('GET', '/me/api-keys');
  }

  public create(input: CreateApiKeyInput): Promise<unknown> {
    return this.client.request('POST', '/me/api-keys', { body: input });
  }

  public delete(id: string): Promise<void> {
    return this.client.request('DELETE', `/me/api-keys/${id}`);
  }
}
