/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { UserService } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import httpStatus from "http-status-codes"


const createUser = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const user = await UserService.createUser(req.body)

        sendResponse(res, {
            success: true,
            statusCode: httpStatus.CREATED,
            message: "User created successfully",
            data: user,
        })
    }
)

const listOfAllUsers = catchAsync(async (req: Request, res: Response, next: NextFunction) => {

    const query = req.query;

    const allUsers= await UserService.listOfAllUsers(query  as Record<string,string>) 

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Get All the User Successfully",
        data: allUsers
    })
})


const blockUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const id = req.params.id

    const blockedUser = await UserService.blockUser(id)

     sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Block User Successfully",
        data: null
    })
})
const unblockUser = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    
    const id = req.params.id

    const unblockedUser = await UserService.unblockUser(id)

     sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Unblock User Successfully",
        data: null
    })
})

const approveAgent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const agentId = req.params.agentId;

    const approveAgent = await UserService.approveAgent(agentId)

     sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Approve Agent Successfully",
        data: null
    })
})

const suspendAgent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const agentId = req.params.agentId;

    const suspendAgent = await UserService.suspendAgent(agentId)

     sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Suspend Agent Successfully",
        data: null
    })
})

export const userControllers = {
    createUser,
    listOfAllUsers,
    blockUser,
    unblockUser,
    approveAgent,
    suspendAgent
}

