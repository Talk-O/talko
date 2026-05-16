export class TalkoError extends Error {
    statusCode;
    code;
    details;
    constructor(message, statusCode, code, details) {
        super(message);
        this.name = 'TalkoError';
        this.statusCode = statusCode;
        this.code = code;
        this.details = details;
    }
    static fromResponse(statusCode, payload) {
        if (payload && typeof payload === 'object') {
            const asRecord = payload;
            const message = typeof asRecord.message === 'string'
                ? asRecord.message
                : typeof asRecord.error === 'string'
                    ? asRecord.error
                    : `TalkO API request failed with status ${statusCode}`;
            const code = typeof asRecord.code === 'string' ? asRecord.code : undefined;
            return new TalkoError(message, statusCode, code, payload);
        }
        return new TalkoError(`TalkO API request failed with status ${statusCode}`, statusCode, undefined, payload);
    }
}
