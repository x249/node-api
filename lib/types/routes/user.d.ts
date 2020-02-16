import { DBUserInterface } from '../../db';

export type NewUserRequestType =
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
    | undefined;

export type AuthUserRequestType =
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
    | undefined;

export type GetAllUsersRequestType =
    | {
          status: number;
          users: DBUserInterface[];
          error?: undefined;
      }
    | {
          status: number;
          error: Error;
          users?: undefined;
      };
