import jsonwebtoken from 'jsonwebtoken';
import { secret } from '../config';

const SECRET: string | any = secret;

export const generateToken = async (id: string, userType: string, expiry: string) => {
    return await jsonwebtoken.sign({ id, userType }, SECRET, {
        expiresIn: expiry,
    });
};
