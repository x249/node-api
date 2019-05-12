import mongoose from "mongoose";
import * as Config from "../config/index";
import User from "./users/index";

const DB_URL: string = Config.DB_URL || "mongodb://127.0.0.1:27017/egov-db";

try {
	mongoose.connect(DB_URL, { useNewUrlParser: true, useCreateIndex: true });
} catch (err) {
	console.log(err);
}

export default {
	User
};
