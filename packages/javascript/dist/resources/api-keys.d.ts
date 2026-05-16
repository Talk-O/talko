import type { TalkoHttpClient } from '../client';
import type { CreateApiKeyInput } from '../types';
export declare class ApiKeysResource {
    private readonly client;
    constructor(client: TalkoHttpClient);
    list(): Promise<unknown>;
    create(input: CreateApiKeyInput): Promise<unknown>;
    delete(id: string): Promise<void>;
}
