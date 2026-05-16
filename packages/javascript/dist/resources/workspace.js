export class WorkspaceResource {
    client;
    constructor(client) {
        this.client = client;
    }
    profile() {
        return this.client.request('GET', '/me');
    }
    widget() {
        return this.client.request('GET', '/me/widget');
    }
}
