import AppError from "../../errorHelper/AppError"
import { Wallet } from "../wallet/wallet.model"
import httpStatus from "http-status-codes"
import { Transaction } from "./transaction.model"


const getAllTransaction = async() => {
   

    const transaction = await Transaction.find()
        .sort({ createdAt: -1 })
        .populate("performedBy", "_id role")
        .populate("from", "owner ")
        .populate("to", "owner ")
        
    // console.log(transaction);
    return transaction
}
const getMyTransactionHistory = async (ownerId:string, query:Record<string,string>) => {
    const wallet = await Wallet.findOne({ owner: ownerId })
    const page = query.page || 1
    const limit = query.limit || 5
    const skip = (+page - 1) * +limit;
    if (!wallet) {
        throw new AppError(httpStatus.NOT_FOUND,"Wallet not found")
    }

    const transactions = await Transaction.find({

    })
        .skip(skip)
        .limit(+limit)
       
        .sort({ createdAt: -1 })
      
    // console.log(transactions,wallet);
    return transactions
}

const getCommissionHistory = async (agentId:string) => {
    const transactions = await Transaction.find({
        performedBy: agentId,
        commission: { $gt: 0 }
    })
    .sort({ createdAt: -1 })
    
    return transactions
}


export const transactionService = {
    getMyTransactionHistory,
    getCommissionHistory,
    getAllTransaction
}