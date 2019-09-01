import jsonwebtoken from "jsonwebtoken";
import { secret } from "../config";

const SECRET: string | any = secret;

export const generateToken = (id: string, userType: string, expiry: string) => {
	return jsonwebtoken.sign({ id, userType }, SECRET, { expiresIn: expiry });
};
