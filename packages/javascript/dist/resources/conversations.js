export class ConversationsResource {
    client;
    constructor(client) {
        this.client = client;
    }
    list(params = {}) {
        return this.client.request('GET', '/conversations', { query: params });
    }
    get(id) {
        return this.client.request('GET', `/conversations/${id}`);
    }
    sendMessage(id, input) {
        return this.client.request('POST', `/conversations/${id}/messages`, { body: input });
    }
    update(id, input) {
        return this.client.request('PATCH', `/conversations/${id}`, { body: input });
    }
    close(id) {
        return this.client.request('POST', `/conversations/${id}/close`);
    }
    visitorContext(id) {
        return this.client.request('GET', `/conversations/${id}/visitor-context`);
    }
    join(id) {
        return this.client.request('POST', `/conversations/${id}/join`);
    }
    transfer(id, input) {
        return this.client.request('POST', `/conversations/${id}/transfer`, { body: input });
    }
    addNote(id, input) {
        return this.client.request('POST', `/conversations/${id}/notes`, { body: input });
    }
}
