import type { ApiErrorResponse } from './types';

export class TalkoError extends Error {
  public readonly statusCode: number;
  public readonly code?: string;
  public readonly details?: unknown;

  public constructor(message: string, statusCode: number, code?: string, details?: unknown) {
    super(message);
    this.name = 'TalkoError';
    this.statusCode = statusCode;
    this.code = code;
    this.details = details;
  }

  public static fromResponse(statusCode: number, payload: ApiErrorResponse | unknown): TalkoError {
    if (payload && typeof payload === 'object') {
      const asRecord = payload as Record<string, unknown>;
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
