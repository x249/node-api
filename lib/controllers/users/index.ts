import { User, DBUserInterface } from '../../db/index';
import * as bcrypt from 'bcryptjs';
import { generateToken } from '../../helpers';
import { NewUserType, AuthenticateUserType, NewUserParams, AuthUserParams } from './types';

export const newUser: NewUserType = async (params: NewUserParams) => {
    const userExists: DBUserInterface | null = await User.findOne({ username: params.username });
    if (userExists) {
        return { status: 400, error: 'User already exists' };
    } else {
        try {
            const hashedPassword = await bcrypt.hash(params.password, 10);
            const user: DBUserInterface = new User({
                username: params.username,
                email: params.email,
                firstName: params.firstName,
                lastName: params.lastName,
                password: hashedPassword,
                role: params.role,
            });
            console.log(typeof user);
            await user.save();
            return { status: 201, message: 'User successfully created!' };
        } catch (err) {
            console.log(err);
        }
    }
};

export const authenticateUser: AuthenticateUserType = async (params: AuthUserParams) => {
    try {
        const user: DBUserInterface | null = await User.findOne({ username: params.username });
        if (!user) {
            return { status: 404, error: "User doesn't exist" };
        } else {
            const authSuccess = await bcrypt.compare(params.password, user.password);
            if (authSuccess) {
                const token = await generateToken(user._id, user.role, '30d');
                const { password, ...userWithoutPassword } = user;
                return {
                    status: 200,
                    message: 'Authentication successful',
                    user: userWithoutPassword,
                    token,
                };
            } else {
                return { status: 400, error: 'Wrong username or password' };
            }
        }
    } catch (err) {
        console.log(err);
    }
};
