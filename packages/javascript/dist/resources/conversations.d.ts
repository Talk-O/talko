import type { TalkoHttpClient } from '../client';
import type { AddNoteInput, ConversationListParams, ConversationSummary, PaginatedResponse, SendMessageInput, TransferConversationInput, UpdateConversationInput } from '../types';
export declare class ConversationsResource {
    private readonly client;
    constructor(client: TalkoHttpClient);
    list(params?: ConversationListParams): Promise<PaginatedResponse<ConversationSummary>>;
    get(id: string): Promise<ConversationSummary>;
    sendMessage(id: string, input: SendMessageInput): Promise<unknown>;
    update(id: string, input: UpdateConversationInput): Promise<unknown>;
    close(id: string): Promise<unknown>;
    visitorContext(id: string): Promise<unknown>;
    join(id: string): Promise<unknown>;
    transfer(id: string, input: TransferConversationInput): Promise<unknown>;
    addNote(id: string, input: AddNoteInput): Promise<unknown>;
}
