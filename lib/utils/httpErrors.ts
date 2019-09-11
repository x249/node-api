export abstract class HTTPClientError extends Error {
    public readonly statusCode!: number;
    public readonly name!: string;

    constructor(message: object | string) {
        if (message instanceof Object) {
            super(JSON.stringify(message));
        } else {
            super(message);
        }
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}

export class HTTP400Error extends HTTPClientError {
    public readonly statusCode: number = 400;

    constructor(message: string | Record<string, any> = 'Bad request') {
        super(message);
    }
}

export class HTTP401Error extends HTTPClientError {
    public readonly statusCode: number = 401;

    constructor(message: string | object = 'Unauthorized') {
        super(message);
    }
}

export class HTTP404Error extends HTTPClientError {
    readonly statusCode: number = 404;

    constructor(message: string | object = 'Server Error') {
        super(message);
    }
}
