import type { RequestOptions, TalkoClientOptions } from './types';
export declare class TalkoHttpClient {
    private readonly baseUrl;
    private readonly token;
    private readonly timeoutMs;
    constructor(options: TalkoClientOptions);
    request<T>(method: string, path: string, options?: RequestOptions): Promise<T>;
}
