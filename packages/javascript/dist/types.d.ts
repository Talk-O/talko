export type JsonPrimitive = string | number | boolean | null;
export type JsonValue = JsonPrimitive | JsonValue[] | {
    [key: string]: JsonValue;
};
export type QueryValue = string | number | boolean | null | undefined;
export interface TalkoClientOptions {
    baseUrl?: string;
    apiKey?: string;
    accessToken?: string;
    timeoutMs?: number;
}
export interface RequestOptions {
    query?: object;
    body?: unknown;
    headers?: Record<string, string>;
}
export interface ApiErrorResponse {
    error?: string;
    message?: string;
    code?: string;
    statusCode?: number;
}
export interface PaginatedResponse<T> {
    data?: T[];
    meta?: {
        cursor?: string | null;
        nextCursor?: string | null;
        total?: number;
    };
    [key: string]: unknown;
}
export interface ConversationSummary {
    id: string;
    status?: string;
    priority?: string;
    subject?: string | null;
    channel?: string;
    assignedAgentId?: string | null;
    teamId?: string | null;
    tags?: string[];
    createdAt?: string;
    updatedAt?: string;
    [key: string]: unknown;
}
export interface ConversationListParams {
    status?: string;
    limit?: number;
    cursor?: string;
    assignedAgentId?: string;
    teamId?: string;
    search?: string;
}
export interface SendMessageInput {
    content: string;
    sender: 'AGENT' | 'BOT' | 'SYSTEM';
    metadata?: Record<string, unknown>;
}
export interface UpdateConversationInput {
    status?: string;
    priority?: string;
    subject?: string | null;
    assignedAgentId?: string | null;
    teamId?: string | null;
    tags?: string[];
}
export interface TransferConversationInput {
    agentId?: string;
    teamId?: string;
    note?: string;
}
export interface AddNoteInput {
    content: string;
    visibility?: 'private' | 'internal';
}
export type WebhookEventName = 'conversation:created' | 'conversation:resolved' | 'message:received' | 'ticket:created' | 'ticket:updated' | 'visitor:created';
export interface CreateWebhookInput {
    url: string;
    events: WebhookEventName[];
}
export interface UpdateWebhookInput {
    url?: string;
    events?: WebhookEventName[];
    isActive?: boolean;
}
export type ConnectorType = 'zendesk' | 'freshdesk' | 'hubspot' | 'salesforce' | 'pipedrive' | 'shopify';
export interface CreateApiKeyInput {
    name: string;
    scopes?: string[];
    expiresAt?: string;
}
