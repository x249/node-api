import { HTTPClientError } from './httpClientError';

export class HTTP400Error extends HTTPClientError {
    public readonly statusCode: number = 400;

    constructor(message: string | object = 'Bad request') {
        super(message);
    }
}
