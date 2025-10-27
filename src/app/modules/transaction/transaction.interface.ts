/* eslint-disable @typescript-eslint/no-explicit-any */
import { Types } from "mongoose";

export enum Transaction_Status{
    PENDING = "PENDING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED"

}

export enum Transaction_Type{
    TRANSFER = "TRANSFER",
    CASH_IN = "CASH_IN",
    CASH_OUT = "CASH_OUT",
    WITHDRAW = "WITHDRAW",
    DEPOSIT = "DEPOSIT"
    
    
}

export interface ITransaction{
    type: "transfer" | "cashIn"|"cashOut" | "withdraw";
    amount: number;
    from?: Types.ObjectId;  // wallet id or user id
    to?: Types.ObjectId;     // wallet id or user id
    performedBy: Types.ObjectId; // user/agent who initiated
    status: Transaction_Status;
    commission?: number;
    metaData?: any

}