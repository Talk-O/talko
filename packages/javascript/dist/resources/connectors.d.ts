import type { TalkoHttpClient } from '../client';
import type { ConnectorType } from '../types';
export declare class ConnectorsResource {
    private readonly client;
    constructor(client: TalkoHttpClient);
    list(): Promise<unknown>;
    upsert(type: ConnectorType, config: Record<string, unknown>): Promise<unknown>;
    disable(type: ConnectorType): Promise<void>;
}
