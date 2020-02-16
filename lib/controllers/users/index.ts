import { User, DBUserInterface } from '../../db';
import { hash, verify, argon2i } from 'argon2';
import { generateToken } from '../../helpers';
import {
    NewUserType,
    AuthenticateUserType,
    NewUserParams,
    AuthUserParams,
    GetAllUsersType,
    GetUserParams,
    GetUserType,
} from '../../types/controllers/user';

export const newUser: NewUserType = async (params: NewUserParams) => {
    const usernameTaken = await User.findOne({
        username: params.username,
    })
        .lean()
        .select('username');
    const emailTaken = await User.findOne({
        email: params.email,
    })
        .lean()
        .select('email');
    if (!!usernameTaken || !!emailTaken) {
        return { status: 400, error: 'User already exists' };
    } else {
        try {
            const hashedPassword = await hash(params.password, {
                type: argon2i,
                memoryCost: 8192,
                parallelism: 2,
            });
            const user = await User.create({
                email: params.email,
                firstName: params.firstName,
                lastName: params.lastName,
                password: hashedPassword,
                role: params.role,
                username: params.username,
            });
            await user.save();
            return { status: 201, message: 'User successfully created!' };
        } catch (err) {
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
        }).lean();
        if (!user) {
            return { status: 404, error: "User doesn't exist" };
        } else {
            const passwordsMatch = await verify(
                user.password,
                params.password,
                {
                    version: argon2i,
                    memoryCost: 8192,
                    parallelism: 2,
                },
            );
            if (!!passwordsMatch) {
                const token = await generateToken({
                    id: user._id,
                    userType: user.role,
                    expiresIn: '30d',
                });
                const { password, ...userWithoutPassword } = user;
                const removedPassword = {
                    password,
                };
                delete removedPassword.password;
                return {
                    message: 'Authentication successful',
                    status: 200,
                    token,
                    user: userWithoutPassword,
                };
            } else {
                return { status: 400, error: 'Wrong username or password' };
            }
        }
    } catch (err) {
        return { status: 500, error: err.message };
    }
};

export const getAllUsers: GetAllUsersType = async () => {
    try {
        const users: DBUserInterface[] = await User.find()
            .lean()
            .select('-password');
        return { status: 200, users };
    } catch (err) {
        return { status: 500, error: err.message };
    }
};

export const getUser: GetUserType = async (params: GetUserParams) => {
    try {
        const user: DBUserInterface = await User.findOne({ ...params })
            .lean()
            .select('-password');
        return !!user
            ? { status: 200, user }
            : { status: 400, message: 'User not found!' };
    } catch (err) {
        return { status: 500, error: err.message };
    }
};
