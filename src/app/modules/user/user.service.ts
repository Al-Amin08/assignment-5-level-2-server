/* eslint-disable prefer-const */
/* eslint-disable no-console */
import AppError from "../../errorHelper/AppError";
import { Current_Status, IUser, Role } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes"
import bcryptjs from "bcryptjs"

import { Wallet } from "../wallet/wallet.model";


const createUser = async (payload: Partial<IUser>) => {
    let { name, email, password, role,current_status } = payload
    
    console.log(name, email, password, role,current_status);
    const isUserExist = await User.findOne({ email })
    
    if (isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST,"User Already Exist")
    }

    if (role === Role.AGENT) {
        current_status=Current_Status.APPROVE
    }

    
    const hashPassword = await bcryptjs.hash(password as string, 10);

    const user = await User.create({
        name,
        email,
        password: hashPassword,
        role,current_status
    })

     await Wallet.create({owner:user._id,balance:50})

    return user
}


// const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {
//     const isUserExist=await User.findById(userId)
//     if (!isUserExist) {
//         throw new AppError(httpStatus.NOT_FOUND,"User not Found.")
//     }


//     if (payload.role) {
//         if (decodedToken.role === Role.USER || decodedToken.role === Role.AGENT) {
//             throw new AppError(httpStatus.FORBIDDEN,"YOu are not Authorized")
//         }
        
//         if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
//             throw new AppError(httpStatus.FORBIDDEN,"YOu are not Authorized")
//         }
//     }

    
//     if (payload.password) {
//         payload.password=await bcryptjs.hash(payload.password,10)
//     }

//     const newUpdateUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })
    
//     return newUpdateUser 



// }

const listOfAllUsers = async (query:Record<string,string>) => {
    const page = query.page || 1
    const limit = query.limit || 5
    const skip = (+page - 1) * +limit;

    console.log({ page: page, limit, skip });
    
    const users =await User.find()
        .skip(skip)
        .limit(+limit)
        .select("-password")
    
    return users
}

const blockUser =async (id:string) => {
    const user = await User.findByIdAndUpdate(id, { current_status: Current_Status.BLOCKED }, { new: true, runValidators: true })
    
    await Wallet.findOneAndUpdate({owner:id}, { current_status: Current_Status.BLOCKED })
    
    return user
}

const unblockUser = async (id:string) => {
    const user = await User.findByIdAndUpdate(id, { current_status: Current_Status.UNBLOCKED }, { new: true, runValidators: true })
    
    await Wallet.findOneAndUpdate({owner:id}, { current_status: Current_Status.UNBLOCKED })
    
    return user
}

const approveAgent = async (agentId:string) => {
   

    const approveAgent = await User.findByIdAndUpdate(agentId, { current_status: Current_Status.APPROVE }, { new: true, runValidators: true })
    
    await Wallet.findOneAndUpdate({ owner: agentId }, { current_status: Current_Status.APPROVE })
    
    return approveAgent

}
const suspendAgent = async (agentId:string) => {
   

    const suspendAgent = await User.findByIdAndUpdate(agentId, { current_status: Current_Status.SUSPEND }, { new: true, runValidators: true })
    
    await Wallet.findOneAndUpdate({ owner: agentId }, { current_status: Current_Status.SUSPEND })
    
    return suspendAgent

}
export const UserService = {
    createUser,
    // updateUser
    listOfAllUsers,
    blockUser,
    unblockUser,
    approveAgent,
    suspendAgent

}