import { HTTPClientError } from './httpClientError';

export class HTTP404Error extends HTTPClientError {
    public readonly statusCode: number = 404;

    constructor(message: string | Record<string, object> = 'Server Error') {
        super(message);
    }
}
