import { User } from "../../db/index";
import * as bcrypt from "bcryptjs";
import { generateToken } from "../../helpers";


interface newUserParams {
	username: string;
	email: string;
	firstName: string;
	lastName: string;
	role: string;
	password: string;
}

interface authUserParams {
	username: string;
	password: string;
}

export const newUser = async (params: newUserParams) => {
	const userExists = await User.findOne({ username: params.username });
	if (userExists) {
		return { status: 400, error: "User already exists" };
	} else {
		try {
			const hashedPassword = await bcrypt.hash(params.password, 10);
			const user = new User({
				username: params.username,
				email: params.email,
				firstName: params.firstName,
				lastName: params.lastName,
				password: hashedPassword,
				role: params.role
			});
			await user.save();
			return { status: 201, message: "User successfully created!" };
		} catch (err) {
			console.log(err);
		}
	}
};

export const authenticateUser = async (params: authUserParams) => {
	try {
		const user: any = await User.findOne({ username: params.username });
		if (!user) {
			return { status: 404, error: "User doesn't exist" };
		} else {
			const authSuccess = await bcrypt.compare(params.password, user.password);
			if (authSuccess) {
				const token = generateToken(user._id, user.role, "30d");
				const { password, ...userWithoutPassword } = user._doc;
				return {
					status: 200,
					message: "Authentication successful",
					user: userWithoutPassword,
					token
				};
			} else {
				return { status: 400, error: "Wrong username or password" };
			}
		}
	} catch (err) {
		console.log(err);
	}
};
