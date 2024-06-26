import { Schema, Document, model, Model } from 'mongoose';
export interface UserAttrs {
    _id?: string;
    name: string;
    email: string;
    password: string;
}

export interface UserParams {
    id: string;
    page: number;
    limit: number;
}

export const UserSchema: Schema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

export interface UserDocument extends Document {
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserModel extends Model<UserDocument> {
    addOne(doc: UserAttrs): UserDocument;
}

UserSchema.statics.addOne = (doc: UserAttrs) => {
    return new User(doc);
};

export const User = model<UserDocument, UserModel>('User', UserSchema);