import { model, Schema } from "mongoose";
import { IAdminSystem } from "./admin.interface";

const adminSystemSchema = new Schema<IAdminSystem>({
    commission: { type: Number, required: true,default:1 },
    minBalance: { type: Number, required: true, default:10 },
    updatedBy: {type:String, default:"ADMIN"},
    adminId: {
        type: Schema.Types.ObjectId,
        ref:"User"
    }
}, {
    timestamps:true,versionKey:false
})

export const AdminSystem =model<IAdminSystem>("AdminSystem",adminSystemSchema)