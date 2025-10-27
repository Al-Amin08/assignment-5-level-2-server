import { Model, Types } from "mongoose";
import { Current_Status } from "../user/user.interface";

export interface IWallet{
    owner: Types.ObjectId;
    balance: number;
    current_status: Current_Status;

}

export interface WalletStaticMethod extends Model<IWallet>{
    updateAvailability(ownerID: string): void;
}

