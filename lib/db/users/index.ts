import mongoose, { Schema, Document } from 'mongoose';

export interface DBUserInterface extends Document {
    createdAt: Date;
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: string;
    updatedAt: Date;
    username: string;
}

const userSchema: Schema = new Schema({
    createdAt: {
        default: Date.now,
        type: Date,
    },
    email: {
        required: [true, 'Email is required'],
        trim: true,
        type: String,
        unique: true,
    },
    firstName: {
        required: [true, 'First name is required'],
        type: String,
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    password: {
        required: [true, 'Password is required'],
        trim: true,
        type: String,
        unique: true,
    },
    role: {
        enum: ['User', 'Admin'],
        required: [true, 'User type is required'],
        type: String,
    },
    updatedAt: {
        type: Date,
    },
    username: {
        required: [true, 'Username is required'],
        trim: true,
        type: String,
        unique: true,
    },
});

userSchema.set('toJSON', { virtuals: true });

export const User = mongoose.model<DBUserInterface>('User', userSchema);

export { User as default };
