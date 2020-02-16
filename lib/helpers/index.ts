import { sign } from 'jsonwebtoken';
import { SECRET } from '../config';
import { GenerateTokenPayload } from '../types/helpers';

/**
 *  Used to create a signed JWT
 * @param payload {Object}
 * @param payload.id {Number} User Id
 * @param payload.userType {String} User type/role
 * @param payload.expiresIn {String} Live duration for the token
 */
export const generateToken: (
    payload: GenerateTokenPayload,
) => Promise<string> = async (payload: GenerateTokenPayload) => {
    return await sign({ id: payload.id, userType: payload.userType }, SECRET, {
        expiresIn: payload.expiresIn,
    });
};
