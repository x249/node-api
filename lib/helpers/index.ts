import { sign } from 'jsonwebtoken';
import { SECRET } from '../config';

export const generateToken: (
    id: string,
    userType: string,
    expiry: string,
) => Promise<string> = async (id: string, userType: string, expiry: string) => {
    return await sign({ id, userType }, SECRET, {
        expiresIn: expiry,
    });
};
