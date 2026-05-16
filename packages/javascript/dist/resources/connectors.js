export class ConnectorsResource {
    client;
    constructor(client) {
        this.client = client;
    }
    list() {
        return this.client.request('GET', '/me/connectors');
    }
    upsert(type, config) {
        return this.client.request('PUT', `/me/connectors/${type}`, { body: config });
    }
    disable(type) {
        return this.client.request('DELETE', `/me/connectors/${type}`);
    }
}
