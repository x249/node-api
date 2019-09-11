import { DBUserInterface } from '../../db/index';

export interface NewUserParams {
    username: DBUserInterface['username'];
    email: DBUserInterface['email'];
    firstName: DBUserInterface['firstName'];
    lastName: DBUserInterface['lastName'];
    role: DBUserInterface['role'];
    password: DBUserInterface['password'];
}
export interface AuthUserParams {
    username: DBUserInterface['username'];
    password: DBUserInterface['password'];
}

export type NewUserType = (
    params: NewUserParams,
) => Promise<
    | { status: number; error: string; message?: undefined }
    | { status: number; message: string; error?: undefined }
    | undefined
>;
export type AuthenticateUserType = (
    params: AuthUserParams,
) => Promise<
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
              updatedAt?: Date;
          };
          token: string;
          error?: undefined;
      }
    | undefined
>;
