import {
	handleCors,
	handleCompression,
	handleBodyParsing,
	handleLogger,
	handleHelmet,
	handleRateLimit,
	handleJWTAuthorization
} from "./common";

export default [
	handleCors,
	handleCompression,
	handleBodyParsing,
	handleLogger,
	handleHelmet,
	handleRateLimit,
	handleJWTAuthorization
];
