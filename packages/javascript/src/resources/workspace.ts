import type { TalkoHttpClient } from '../client';

export class WorkspaceResource {
  public constructor(private readonly client: TalkoHttpClient) {}

  public profile(): Promise<unknown> {
    return this.client.request('GET', '/me');
  }

  public widget(): Promise<unknown> {
    return this.client.request('GET', '/me/widget');
  }
}
