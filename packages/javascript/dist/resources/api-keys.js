export class ApiKeysResource {
    client;
    constructor(client) {
        this.client = client;
    }
    list() {
        return this.client.request('GET', '/me/api-keys');
    }
    create(input) {
        return this.client.request('POST', '/me/api-keys', { body: input });
    }
    delete(id) {
        return this.client.request('DELETE', `/me/api-keys/${id}`);
    }
}
