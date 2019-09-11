import mongoose, { Schema, Document } from 'mongoose';

export interface DBUserInterface extends Document {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema: Schema = new Schema({
    createdAt: {
        type: Date,
        default: Date.now,
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
    },
    firstName: {
        type: String,
        required: [true, 'First name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        unique: true,
        trim: true,
    },
    role: {
        type: String,
        enum: ['User', 'Admin'],
        required: [true, 'User type is required'],
    },
    updatedAt: {
        type: Date,
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true,
    },
});

userSchema.set('toJSON', { virtuals: true });

export const User = mongoose.model<DBUserInterface>('User', userSchema);

export { User as default };
