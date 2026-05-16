import { TalkoError } from './errors';
function normalizeBaseUrl(baseUrl) {
    return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
}
function appendQuery(url, query) {
    if (!query)
        return;
    for (const [key, value] of Object.entries(query)) {
        if (value === undefined || value === null || value === '')
            continue;
        if (Array.isArray(value)) {
            for (const item of value) {
                if (item !== undefined && item !== null && item !== '') {
                    url.searchParams.append(key, String(item));
                }
            }
            continue;
        }
        url.searchParams.set(key, String(value));
    }
}
export class TalkoHttpClient {
    baseUrl;
    token;
    timeoutMs;
    constructor(options) {
        this.baseUrl = normalizeBaseUrl(options.baseUrl ?? 'https://api.gettalko.com/v1');
        this.token = options.apiKey ?? options.accessToken ?? '';
        this.timeoutMs = options.timeoutMs ?? 30_000;
        if (!this.token) {
            throw new Error('Talko client requires either apiKey or accessToken.');
        }
    }
    async request(method, path, options = {}) {
        const url = new URL(path.startsWith('/') ? `${this.baseUrl}${path}` : `${this.baseUrl}/${path}`);
        appendQuery(url, options.query);
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), this.timeoutMs);
        try {
            const response = await fetch(url, {
                method,
                headers: {
                    Authorization: `Bearer ${this.token}`,
                    Accept: 'application/json',
                    ...(options.body !== undefined ? { 'Content-Type': 'application/json' } : {}),
                    ...options.headers,
                },
                body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
                signal: controller.signal,
            });
            const raw = await response.text();
            const payload = raw.length > 0 ? JSON.parse(raw) : null;
            if (!response.ok) {
                throw TalkoError.fromResponse(response.status, payload);
            }
            return payload;
        }
        catch (error) {
            if (error instanceof TalkoError) {
                throw error;
            }
            if (error instanceof Error && error.name === 'AbortError') {
                throw new TalkoError(`TalkO API request timed out after ${this.timeoutMs} ms`, 408, 'REQUEST_TIMEOUT');
            }
            throw new TalkoError(error instanceof Error ? error.message : 'Unexpected TalkO client error', 500, 'CLIENT_ERROR');
        }
        finally {
            clearTimeout(timeout);
        }
    }
}
