import jsonwebtoken from "jsonwebtoken";
import * as Config from "../config";

const SECRET: string | any = Config.secret;

export const generateToken = (id: string, userType: string, expiry: string) => {
	return jsonwebtoken.sign({ id, userType }, SECRET, { expiresIn: expiry });
};
