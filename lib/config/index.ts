require('dotenv').config();

export const env: string | undefined = process.env.NODE_ENV;

export const secret: string | undefined = process.env.SECRET;

export const API_VER: string | undefined = process.env.API_VER;

export const DB_URL: string | undefined = process.env.DB_URL;
