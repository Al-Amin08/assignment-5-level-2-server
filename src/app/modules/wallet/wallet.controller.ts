/* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable no-console */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

import { JwtPayload } from "jsonwebtoken";
import { walletService } from "./wallet.service";

const getMyWallet = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const {userId} = req.user as JwtPayload
    const ownerId = userId;
    
    const wallet = await walletService.getMyWallet(ownerId)
     sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "get my wallet Successfully",
            data: wallet
        })

})


const getAllWallet = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

  const getAllWallet = await walletService.getAllWallet()
  sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "All  wallet retrieved Successfully",
            data: getAllWallet
        })
})


const deposit = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { amount } = req.body
  const depositAmount =amount
  // console.log(depositAmount);
   const {userId} = req.user as JwtPayload
    const ownerId = userId;

    const depositInWallet = await walletService.depositInWallet(depositAmount, ownerId)
      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Deposit money to your wallet Successfully",
        data: depositInWallet
    })
})



const withdraw = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { amount } = req.body
  const withdrawAmount = amount;
  // console.log(withdrawAmount);
  
    const { userId } = req.user as JwtPayload
    const ownerId = userId

    const withdrawInWallet = await walletService.withdrawInWallet(withdrawAmount, ownerId)
    
      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Withdraw money from your wallet Successfully",
        data: withdrawInWallet
    })
})



const transfer = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const { receiver_Email, amount } = req.body
    const { userId } = req.user as JwtPayload

    const fromUserId =userId

    const transferAmount = amount;
    
  // console.log(receiver_Email,fromUserId,amount,"from transfer controllers");
    const transfer = await walletService.transfer(receiver_Email, fromUserId, transferAmount) 
    
      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Transfer money from your wallet Successfully",
        data: transfer
    })
})

const agentCashIn = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const { userEmail, amount} = req.body;
    const { userId } = req.user as JwtPayload
    
    const agentId = userId;

    const agentCashIn = await walletService.agentCashIn(userEmail, agentId, amount);

      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Cash In done Successfully",
        data: agentCashIn
    })
})

const agentCashOut = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const { userEmail, amount} = req.body;
    const { userId } = req.user as JwtPayload
    
    const agentId = userId;

    const agentCashOut = await walletService.agentCashOut(userEmail, agentId, amount);

      sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Cash Out done Successfully",
        data: agentCashOut
    })
})
export const walletControllers = {
    getMyWallet,
    getAllWallet,
    deposit,
    withdraw,
    transfer,
    agentCashIn,
    agentCashOut,
    
}