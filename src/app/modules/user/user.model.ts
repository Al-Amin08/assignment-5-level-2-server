import { model, Schema } from "mongoose";
import { Current_Status, IUser, Role } from "./user.interface";

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique:true},
        password: { type: String, required: true },
        role: {
            type: String,
            enum: Object.values(Role),
            default: Role.USER
        },
        current_status: {
            type: String,
            enum: Object.values(Current_Status),
            default: Current_Status.UNBLOCKED
        }
    },
    {
        timestamps: true,
        versionKey: false
    })

export const User = model<IUser>("User", userSchema)