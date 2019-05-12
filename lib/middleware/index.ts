import {
	handleCors,
	handleCompression,
	handleBodyParsing,
	handleLogger,
	handleHelmet,
	handleRateLimit,
	handleJWTAuthorization
} from "./common";

import { handleAPIDocs } from "./apiDocs";

export default [
	handleCors,
	handleCompression,
	handleBodyParsing,
	handleLogger,
	handleHelmet,
	handleRateLimit,
	handleJWTAuthorization,
	handleAPIDocs
];
