export type NewUserType =
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

export type AuthUserType =
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
