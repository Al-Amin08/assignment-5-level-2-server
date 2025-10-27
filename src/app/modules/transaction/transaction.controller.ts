/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { JwtPayload } from "jsonwebtoken";
import { transactionService } from "./transaction.service";
import { sendResponse } from "../../utils/sendResponse";



const getAllTransaction = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const getAllTransaction =await transactionService.getAllTransaction()
    // console.log(getAllTransaction);
       sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Transaction History Retrieved Successfully",
        data: getAllTransaction
    })
})

const getMyTransactionHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req.user as JwtPayload
    const ownerId = userId
    const query = req.query;
    const getTransactionHistory = await transactionService.getMyTransactionHistory(ownerId,query as Record<string,string>)

       sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Transaction History Retrieved Successfully",
        data: getTransactionHistory
    })
})

const getCommissionHistory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req.user as JwtPayload
    const agentId = userId

    const getCommissionHistory = await transactionService.getCommissionHistory(agentId)
       sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Commission History Retrieved Successfully",
            data: getCommissionHistory
        })
})

export const transactionController = {
    getMyTransactionHistory,
    getCommissionHistory,
    getAllTransaction
}