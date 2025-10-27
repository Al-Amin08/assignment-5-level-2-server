import { Types } from "mongoose";

export interface IAdminSystem{
    commission: number;
    minBalance: number;
    updatedBy?: string;
    adminId:Types.ObjectId,
}