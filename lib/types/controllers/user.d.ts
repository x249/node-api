import { DBUserInterface } from '../../db';

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

export type GetAllUsersType = () => Promise<
    | {
          status: number;
          users: DBUserInterface[];
          error?: undefined;
      }
    | {
          status: number;
          error: any;
          users?: undefined;
      }
>;

export type GetUserParams = {
    id?: number;
    username?: string;
    email?: string;
};

export type GetUserType = (
    params: GetUserParams,
) => Promise<
    | {
          status: number;
          user: any;
          message?: undefined;
          error?: undefined;
      }
    | {
          status: number;
          message: string;
          user?: undefined;
          error?: undefined;
      }
    | {
          status: number;
          error: any;
          user?: undefined;
          message?: undefined;
      }
>;
