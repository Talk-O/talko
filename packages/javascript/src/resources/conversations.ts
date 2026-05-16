import type { TalkoHttpClient } from '../client';
import type {
  AddNoteInput,
  ConversationListParams,
  ConversationSummary,
  PaginatedResponse,
  SendMessageInput,
  TransferConversationInput,
  UpdateConversationInput,
} from '../types';

export class ConversationsResource {
  public constructor(private readonly client: TalkoHttpClient) {}

  public list(params: ConversationListParams = {}): Promise<PaginatedResponse<ConversationSummary>> {
    return this.client.request('GET', '/conversations', { query: params });
  }

  public get(id: string): Promise<ConversationSummary> {
    return this.client.request('GET', `/conversations/${id}`);
  }

  public sendMessage(id: string, input: SendMessageInput): Promise<unknown> {
    return this.client.request('POST', `/conversations/${id}/messages`, { body: input });
  }

  public update(id: string, input: UpdateConversationInput): Promise<unknown> {
    return this.client.request('PATCH', `/conversations/${id}`, { body: input });
  }

  public close(id: string): Promise<unknown> {
    return this.client.request('POST', `/conversations/${id}/close`);
  }

  public visitorContext(id: string): Promise<unknown> {
    return this.client.request('GET', `/conversations/${id}/visitor-context`);
  }

  public join(id: string): Promise<unknown> {
    return this.client.request('POST', `/conversations/${id}/join`);
  }

  public transfer(id: string, input: TransferConversationInput): Promise<unknown> {
    return this.client.request('POST', `/conversations/${id}/transfer`, { body: input });
  }

  public addNote(id: string, input: AddNoteInput): Promise<unknown> {
    return this.client.request('POST', `/conversations/${id}/notes`, { body: input });
  }
}
