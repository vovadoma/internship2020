import { Schema, model, Document } from "mongoose";

type TUser = {
    firstName: string,
    lastName: string,
    phone: string,
    email: string,
    password: string,
    resetToken: string,
}

const UserScheme = new Schema({
    firstName: { type: String },
    lastName: { type: String },
    phone: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    resetToken: { data: String, default: '' },
});

const User = model<TUser & Document>("Users", UserScheme);

export default User;