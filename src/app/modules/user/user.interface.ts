import { Types } from "mongoose";

export enum Role{
    SUPER_ADMIN = "SUPER_ADMIN", 
    ADMIN = "ADMIN",
    AGENT = "AGENT",
    USER = "USER"

}

export enum Current_Status{
    // for user
    BLOCKED = "BLOCKED",
    UNBLOCKED = "UNBLOCKED",
    // for agent
    APPROVE = "APPROVE",
    SUSPEND = "SUSPEND"
    
}

export interface IUser{
    _id?:Types.ObjectId
    name: string;
    email: string;
    password: string;
    role: Role;
    current_status?: Current_Status;
    createdAt?: Date;
}