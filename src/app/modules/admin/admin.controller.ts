/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { adminService } from "./admin.service";
import { JwtPayload } from "jsonwebtoken";

const setConfig = async () => {
    // const {userId} =req.user as JwtPayload

    // const adminId =userId
    // const setConfig =await adminService.setConfig()
    //   sendResponse(res, {
    //       statusCode: 201,
    //       success: true,
    //       message: "Initial config set Successfully",
    //       data: setConfig
    //   })

    try {
        const setConfig = await adminService.setConfig()
        console.log("Initial config set Successfully");
    } catch (error) {
        console.log(error);
    }
}

const updateConfig = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {userId} =req.user as JwtPayload

    const adminId = userId

    const {commission,minBalance} = req.body
    
    const updateConfig = await adminService.updateConfig(commission, minBalance, adminId);

     sendResponse(res, {
          statusCode: 201,
          success: true,
          message: "New config set Successfully",
          data: updateConfig
      })
})

export const adminController = {
    setConfig,
    updateConfig
}