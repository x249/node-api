import {
    newUser,
    authenticateUser,
    getUser,
    getAllUsers,
} from '../controllers/users';
import { db, User, DBUserInterface } from '../db';
import { NewUserType, AuthUserType } from '../types/tests/controller.test';

const status200 = 200;
const status201 = 201;
const status400 = 400;
const status404 = 404;

describe('controller', () => {
    beforeAll(async done => {
        const user: DBUserInterface | null = await User.findOne({
            email: 'test@testing.com',
        });

        if (user) {
            await User.findOneAndDelete({ _id: user._id });
        }

        done();
    });

    test('create new user', async done => {
        const newUserResponse: NewUserType = await newUser({
            email: 'test@testing.com',
            firstName: 'John',
            lastName: 'Doe',
            password: 'testing123',
            role: 'User',
            username: 'jd12345',
        });

        expect(newUserResponse).toStrictEqual({
            message: 'User successfully created!',
            status: status201,
        });

        done();
    });

    test('create an existing user', async done => {
        const newUserResponse: NewUserType = await newUser({
            email: 'test@testing.com',
            firstName: 'John',
            lastName: 'Doe',
            password: 'testing123',
            role: 'User',
            username: 'jd12345',
        });

        expect(newUserResponse).toStrictEqual({
            error: 'User already exists',
            status: status400,
        });

        done();
    });

    test('authenticate existing user', async done => {
        const authUserResponse: AuthUserType = await authenticateUser({
            password: 'testing123',
            username: 'jd12345',
        });

        if (!!authUserResponse) {
            expect(authUserResponse.status).toEqual(status200);
        }

        done();
    });

    test('authenticate a non existing user', async done => {
        const authUserResponse: AuthUserType = await authenticateUser({
            password: 'testing1234',
            username: 'dj12345',
        });

        if (!!authUserResponse) {
            expect(authUserResponse.status).toEqual(status404);
        }

        done();
    });

    test('get a specific user using email', async done => {
        const user = await User.findOne({ email: 'test@testing.com' })
            .lean()
            .select('email');
        const getUserResponse = await getUser({ email: user.email });

        expect(getUserResponse.user).toBeDefined();
        expect(getUserResponse.status).toBe(status200);
        expect(getUserResponse.error).toBeFalsy();
        done();
    });

    test('get a specific user using username', async done => {
        const user = await User.findOne({ username: 'jd12345' })
            .lean()
            .select('username');
        const getUserResponse = await getUser({ username: user.username });

        expect(getUserResponse.user).toBeDefined();
        expect(getUserResponse.status).toBe(status200);
        expect(getUserResponse.error).toBeFalsy();
        done();
    });

    test('get a specific user using id', async done => {
        const user = await User.findOne({ email: 'test@testing.com' })
            .lean()
            .select('id');
        const getUserResponse = await getUser({ _id: user._id });

        expect(getUserResponse.user).toBeDefined();
        expect(getUserResponse.status).toBe(status200);
        expect(getUserResponse.error).toBeFalsy();
        done();
    });

    test('get all users', async done => {
        const getAllUsersResponse = await getAllUsers();

        expect(getAllUsersResponse).toBeDefined();
        expect(getAllUsersResponse.users).toBeDefined();
        done();
    });

    afterAll(async done => {
        const user: DBUserInterface | null = await User.findOne({
            email: 'test@testing.com',
        })
            .lean()
            .select('id');

        if (user) {
            await User.findOneAndDelete(user.id);
        }

        await db.close();
        done();
    });
});
