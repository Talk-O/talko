export class WebhooksResource {
    client;
    constructor(client) {
        this.client = client;
    }
    list() {
        return this.client.request('GET', '/webhooks');
    }
    create(input) {
        return this.client.request('POST', '/webhooks', { body: input });
    }
    update(id, input) {
        return this.client.request('PATCH', `/webhooks/${id}`, { body: input });
    }
    delete(id) {
        return this.client.request('DELETE', `/webhooks/${id}`);
    }
    rotateSecret(id) {
        return this.client.request('POST', `/webhooks/${id}/rotate-secret`);
    }
    listEvents() {
        return this.client.request('GET', '/me/webhooks/events');
    }
}
