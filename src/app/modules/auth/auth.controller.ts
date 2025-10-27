/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import passport from "passport";
import AppError from "../../errorHelper/AppError";
import { createUserToken } from "../../utils/userToken";
import { setAuthCookie } from "../../utils/setCookie";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"
import { AuthServices } from "./auth.service";
import { JwtPayload } from "jsonwebtoken";

const credentialsLogin = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    
    passport.authenticate("local", async (error: any, user: any, info: any) => {
        
        if (error) {
            return next(new AppError(406,error))
        }

        if (!user) {
            return next(new AppError(401,info.message))
        }

        const userTokens = createUserToken(user)
        
        const { password: pass, ...rest } = user.toObject();

        // console.log(rest);

        setAuthCookie(res, userTokens)

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.OK,
            message: "User Logged In Successfully",
            data: {
                accessToken: userTokens.accessToken,
                
                user: rest
            }
        })
    })(req,res,next)
})
const logOut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie("accessToken", {
        httpOnly: true,
        secure: false,
        sameSite:"lax"
    })

     sendResponse(res, {
      success: true,
      statusCode: httpStatus.CREATED,
      message: "User Logged Out successfully",
      data: null
    });
})

const resetPassword = catchAsync(async (req: Request, res: Response) => {
    const newPassword = req.body.newPassword
    const oldPassword = req.body.oldPassword

    const decodedToken = req.user as JwtPayload

    await AuthServices.resetPassword(oldPassword, newPassword, decodedToken)
    
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "Password Changed successfully",
      data: null
    });
})
export const AuthController = {
    credentialsLogin,
    logOut,
    resetPassword
}