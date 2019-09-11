import jsonwebtoken from 'jsonwebtoken';
import { secret } from '../config';

const SECRET: string | undefined = secret || 'FALLBACK_JWT_SECRET';

export const generateToken: (id: string, userType: string, expiry: string) => Promise<string> = async (
    id: string,
    userType: string,
    expiry: string,
) => {
    return await jsonwebtoken.sign({ id, userType }, SECRET, {
        expiresIn: expiry,
    });
};
