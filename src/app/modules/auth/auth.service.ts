/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { JwtPayload } from "jsonwebtoken";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs"
import httpStatus from "http-status-codes"
import AppError from "../../errorHelper/AppError";



const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {
    const user = await User.findById(decodedToken.userId)

    const isOldPassWordMatch = await bcryptjs.compare(oldPassword, user?.password as string)
    
    if (!isOldPassWordMatch) {
        throw new AppError(httpStatus.UNAUTHORIZED,"Old Password doesn't Match")
    }

    user!.password = await bcryptjs.hash(newPassword,10)
    user?.save()

    return true
}

export const AuthServices = {
    resetPassword
}