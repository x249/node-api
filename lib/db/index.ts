import { createConnection } from 'mongoose';
import { DB_URL } from '../config';
import User, { DBUserInterface } from './users';
import { NODE_ENV } from '../config';

/**
 * Used to create connections with MongoDB
 */
const db = createConnection(DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    autoIndex: NODE_ENV === 'production' ? false : true,
    poolSize: NODE_ENV === 'production' ? 10 : 5,
    reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
    reconnectInterval: 500, // Reconnect every 500ms
    connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4, // Use IPv4, skip trying IPv6
});

export { db as default, User, DBUserInterface };
