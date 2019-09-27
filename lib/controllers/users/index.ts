import { User, DBUserInterface } from '../../db/index';
import * as bcrypt from 'bcryptjs';
import { generateToken } from '../../helpers';
import { NewUserType, AuthenticateUserType, NewUserParams, AuthUserParams } from '../../types/controllers/user';

export const newUser: NewUserType = async (params: NewUserParams) => {
    const userExists: DBUserInterface | null = await User.findOne({ username: params.username });
    if (userExists) {
        return { status: 400, error: 'User already exists' };
    } else {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(params.password, saltRounds);
            const user: DBUserInterface = new User({
                email: params.email,
                firstName: params.firstName,
                lastName: params.lastName,
                password: hashedPassword,
                role: params.role,
                username: params.username,
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
        console.log(err);
    }
};
