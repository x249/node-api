import db, { DBUserInterface } from '../../db';
import { hash, verify, argon2i } from 'argon2';
import { generateToken } from '../../helpers';
import {
    NewUserType,
    AuthenticateUserType,
    NewUserParams,
    AuthUserParams,
} from '../../types/controllers/user';

const User = db.collection('user');

export const newUser: NewUserType = async (params: NewUserParams) => {
    const userExists = await User.findOne({
        username: params.username,
    });
    if (userExists) {
        await db.close();
        return { status: 400, error: 'User already exists' };
    } else {
        try {
            const hashedPassword = await hash(params.password, {
                type: argon2i,
                memoryCost: 8192,
                parallelism: 2,
            });
            await User.insertOne({
                email: params.email,
                firstName: params.firstName,
                lastName: params.lastName,
                password: hashedPassword,
                role: params.role,
                username: params.username,
            });
            await db.close();
            return { status: 201, message: 'User successfully created!' };
        } catch (err) {
            await db.close();
            return { status: 500, error: err };
        }
    }
};

export const authenticateUser: AuthenticateUserType = async (
    params: AuthUserParams,
) => {
    try {
        const user: DBUserInterface | null = await User.findOne({
            username: params.username,
        });
        console.log(user);
        if (!user) {
            await db.close();
            return { status: 404, error: "User doesn't exist" };
        } else {
            const passwordsMatch = await verify(user.password, params.password, {
                version: argon2i,
                memoryCost: 8192,
                parallelism: 2
            });
            console.log(passwordsMatch);
            if (!!passwordsMatch) {
                const token = await generateToken(user._id, user.role, '30d');
                const { password, ...userWithoutPassword } = user;
                const removedPassword = {
                    password,
                };
                delete removedPassword.password;
                await db.close();
                return {
                    message: 'Authentication successful',
                    status: 200,
                    token,
                    user: userWithoutPassword,
                };
            } else {
                await db.close();
                return { status: 400, error: 'Wrong username or password' };
            }
        }
    } catch (err) {
        await db.close();
        return { status: 500, error: err.message };
    }
};
