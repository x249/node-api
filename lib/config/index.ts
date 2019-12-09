import { config } from 'dotenv';

config();

export const {
	NODE_ENV = 'production',
	SECRET = 'SECRET_FOR_JWT_GOES_HERE',
	API_VER = '1.0.0',
	DB_URL = 'mongodb://127.0.0.1:27017/example',
} = process.env;
