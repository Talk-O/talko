import type { ApiErrorResponse } from './types';
export declare class TalkoError extends Error {
    readonly statusCode: number;
    readonly code?: string;
    readonly details?: unknown;
    constructor(message: string, statusCode: number, code?: string, details?: unknown);
    static fromResponse(statusCode: number, payload: ApiErrorResponse | unknown): TalkoError;
}
