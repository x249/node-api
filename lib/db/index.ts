import mongoose from 'mongoose';
import { DB_URL } from '../config';
import User, { DBUserInterface } from './users';

try {
    mongoose.connect(DB_URL, { useNewUrlParser: true, useCreateIndex: true });
} catch (err) {
    console.log(err);
}

export { User, DBUserInterface };
