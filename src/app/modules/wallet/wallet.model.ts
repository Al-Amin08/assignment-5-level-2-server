import { model, Schema } from "mongoose";
import { IWallet, WalletStaticMethod } from "./wallet.interface";
import { Current_Status } from "../user/user.interface";

const walletSchema = new Schema<IWallet>(
    {
        owner: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
        balance: { type: Number, required: true, default: 50, min: 0 },
        current_status: {
            type: String,
            enum: Object.values(Current_Status),
            default:Current_Status.UNBLOCKED
        }
    },
    
    {
    timestamps: true,
    versionKey: false
    }   
)

walletSchema.static("updateAvailability", async function (ownerId: string) {
    const wallet = await this.findById({ owner: ownerId })
    
    if (wallet) {
        wallet.current_status = wallet.current_status>=0 ? wallet.current_status.BLOCKED:wallet.current_status.UNBLOCKED
    }

})

export const Wallet = model<IWallet,WalletStaticMethod>("Wallet",walletSchema)
