/* eslint-disable no-console */
import { NextFunction, Request, Response } from "express";
import AppError from "../errorHelper/AppError";
import { User } from "../modules/user/user.model";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { JwtPayload } from "jsonwebtoken";
import httpStatus from "http-status-codes";
// import { Current_Status } from "../modules/user/user.interface";


export const checkAuth = (...authRoles: string[]) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        const accessToken = req.headers.authorization
        
        if (!accessToken) {
            throw new AppError(403,"No Token Received")
        }

        const verifiedToken = verifyToken(accessToken, envVars.JWT_ACCESS_SECRET) as JwtPayload
        

        const isUserExist = await User.findOne({ email: verifiedToken.email })
        
        if (!isUserExist) {
            throw new AppError(httpStatus.BAD_REQUEST,"User doesn't Exist")
        }

        //   if (isUserExist.current_status === Current_Status.BLOCKED || isUserExist.current_status === Current_Status.SUSPEND) {
        //       throw new AppError(httpStatus.BAD_REQUEST, `User is ${isUserExist.current_status}`)
        // }
        console.log(verifiedToken);
        req.user = verifiedToken
        
         if (!authRoles.includes(verifiedToken.role) ) {
            throw new AppError(403,"You are not permitted to view this")
        }
        console.log(verifiedToken,"From checkAuth");
        console.log(req.user,"From checkAuth req USER");
        next()
    } catch (error) {
        next(error)
    }
}