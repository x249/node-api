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
