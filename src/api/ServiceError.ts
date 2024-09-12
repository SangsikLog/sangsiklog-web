/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class ServiceError extends Error {
    code: number;
    message: string;
    details: any;

    constructor(code: number, message: string, details: any) {
        super(message);
        this.code = code;
        this.message = message;
        this.details = details;
    }
}