/* eslint-disable @typescript-eslint/no-explicit-any */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class GraphqlServiceError extends Error {
    details: any;

    constructor(message: string, details: any) {
        super(message);
        this.details = details;
    }
}