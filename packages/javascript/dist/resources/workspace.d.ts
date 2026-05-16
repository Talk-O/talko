import type { TalkoHttpClient } from '../client';
export declare class WorkspaceResource {
    private readonly client;
    constructor(client: TalkoHttpClient);
    profile(): Promise<unknown>;
    widget(): Promise<unknown>;
}
