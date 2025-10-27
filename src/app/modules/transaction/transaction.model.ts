import { model, Schema } from "mongoose";
import { ITransaction, Transaction_Status, Transaction_Type } from "./transaction.interface";

const transactionSchema = new Schema<ITransaction>(
{
    type: {
        type: String,
        enum:Object.values(Transaction_Type),
        required:true
        },
    amount: { type: Number, required: true, min: 0 },
    from: { type: Schema.Types.ObjectId, ref: "Wallet" },
    to: { type: Schema.Types.ObjectId, ref: "Wallet" },
    performedBy: { type: Schema.Types.ObjectId, ref: "User" },
    status: {
        type: String,
        enum: Object.values(Transaction_Status),
        default:Transaction_Status.PENDING
    },
    commission: { type: Number, default: 0 },
    metaData:{type:Schema.Types.Mixed}
    
    
    
}, { timestamps: true, versionKey: false })


export const Transaction = model<ITransaction>("Transaction",transactionSchema)