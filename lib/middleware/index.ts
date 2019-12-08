import {
	handleCors,
	handleCompression,
	handleBodyParsing,
	handleLogger,
	handleHelmet,
	handleRateLimit,
	handleJWTAuthorization,
} from './common';

import { handleAPIDocs } from './apiDocs';

const middlewareHandler = [
	handleAPIDocs,
	handleCors,
	handleCompression,
	handleBodyParsing,
	handleLogger,
	handleHelmet,
	handleRateLimit,
	handleJWTAuthorization,
];

export { middlewareHandler };
