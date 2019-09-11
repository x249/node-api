import { newUser, authenticateUser } from '../controllers/users';
import { User, DBUserInterface } from '../db';
import mongoose from 'mongoose';

const status200 = 200;
const status201 = 201;
const status400 = 400;
const status404 = 404;

describe('controller', () => {
    test('create new user', async done => {
        const user:
            | {
                  status: number;
                  error: string;
                  message?: undefined;
              }
            | {
                  status: number;
                  message: string;
                  error?: undefined;
              }
            | undefined = await newUser({
            email: 'test@testing.com',
            firstName: 'John',
            lastName: 'Doe',
            password: 'testing123',
            role: 'User',
            username: 'jd12345',
        });
        expect(user).toStrictEqual({
            message: 'User successfully created!',
            status: status201,
        });
        done();
    });

    test('create an existing user', async done => {
        const user:
            | {
                  status: number;
                  error: string;
                  message?: undefined;
              }
            | {
                  status: number;
                  message: string;
                  error?: undefined;
              }
            | undefined = await newUser({
            email: 'test@testing.com',
            firstName: 'John',
            lastName: 'Doe',
            password: 'testing123',
            role: 'User',
            username: 'jd12345',
        });
        expect(user).toStrictEqual({ error: 'User already exists', status: status400 });
        done();
    });

    test('authenticate existing user', async done => {
        const auth:
            | {
                  status: number;
                  error: string;
                  message?: undefined;
                  user?: undefined;
                  token?: undefined;
              }
            | {
                  status: number;
                  message: string;
                  user: {
                      username: string;
                      email: string;
                      role: string;
                      lastName: string;
                      firstName: string;
                      createdAt: Date;
                      updatedAt?: Date | undefined;
                  };
                  token: string;
                  error?: undefined;
              }
            | undefined = await authenticateUser({
            password: 'testing123',
            username: 'jd12345',
        });
        if (auth) {
            expect(auth.status).toEqual(status200);
        }
        done();
    });

    test('authenticate a non existing user', async done => {
        const auth:
            | {
                  status: number;
                  error: string;
                  message?: undefined;
                  user?: undefined;
                  token?: undefined;
              }
            | {
                  status: number;
                  message: string;
                  user: {
                      username: string;
                      email: string;
                      role: string;
                      lastName: string;
                      firstName: string;
                      createdAt: Date;
                      updatedAt?: Date | undefined;
                  };
                  token: string;
                  error?: undefined;
              }
            | undefined = await authenticateUser({
            password: 'testing123',
            username: 'dj12345',
        });
        if (auth) {
            expect(auth.status).toEqual(status404);
        }
        done();
    });

    afterAll(async done => {
        const user: DBUserInterface | null = await User.findOne({
            email: 'test@testing.com',
        });
        if (user) {
            await User.findByIdAndDelete(user._id);
        }
        await mongoose.connection.close();
        done();
    });
});
