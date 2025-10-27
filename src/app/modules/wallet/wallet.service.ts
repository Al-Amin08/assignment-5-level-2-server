
import AppError from "../../errorHelper/AppError"
import { AdminSystem } from "../admin/admin.model"
import { Transaction_Status, Transaction_Type } from "../transaction/transaction.interface"
import { Transaction } from "../transaction/transaction.model"
import { User } from "../user/user.model"
import { Wallet } from "./wallet.model"
import httpStatus from "http-status-codes"




const getAllWallet = async () => {
    const allWallets = await Wallet.find().populate('owner', "name email role ")
    
    return allWallets
}


const getMyWallet = async (ownerId:string) => {
   
    
    const wallet = await Wallet.findOne({ owner: ownerId })
     
        
    return wallet
}


const depositInWallet = async (depositAmount:number,ownerId:string) => {
    const session = await Wallet.startSession();
    session.startTransaction()

    try {
        const wallet = await Wallet.findOne({ owner: ownerId })
        
        if (!wallet || wallet.current_status === "BLOCKED") {
            throw new AppError(httpStatus.FORBIDDEN,"Wallet not found or blocked")
        }

        wallet.balance += depositAmount;
        await wallet.save({ session })
        

        await Transaction.create([{
            type: Transaction_Type.DEPOSIT,
            amount:depositAmount,
            to: wallet._id,
            performedBy: ownerId,
            status: Transaction_Status.COMPLETED
        }], { session });

        await session.commitTransaction()
        session.endSession()
        

    }
catch {
    await session.abortTransaction()
    session.endSession()
}
}



const withdrawInWallet = async (withdrawAmount:number, ownerId:string) => {
      const session = await Wallet.startSession();
    session.startTransaction()

    try {
        const adminConfig = await AdminSystem.findOne()

        // const fee = adminConfig?.commission
        const minBalance =adminConfig?.minBalance as number
        const wallet = await Wallet.findOne({ owner: ownerId })
        
        if (!wallet || wallet.current_status === "BLOCKED") {
            throw new AppError(httpStatus.FORBIDDEN,"Wallet not found or blocked")
        }
        if (wallet.balance - withdrawAmount < minBalance) {
            throw new AppError(httpStatus.FORBIDDEN,`Withdrawal denied. Minimum balance of ৳${minBalance} must remain in your wallet.`)
        }
        wallet.balance -= withdrawAmount;
        await wallet.save({ session })
        

        await Transaction.create([{
            type: Transaction_Type.WITHDRAW,
            amount: withdrawAmount,
            from: wallet._id,
            performedBy: ownerId,
            status: Transaction_Status.COMPLETED
        }], { session });

        await session.commitTransaction()
        session.endSession()
        

    }
catch(error) {
        await session.abortTransaction();
        session.endSession()
        throw error
        
    }
    


}



const transfer = async (receiver_Email: string, sender_UserId: string, transferAmount: number) => {

    const session = await Wallet.startSession();
    session.startTransaction()

    
    
    try {
       
        const adminConfig = await AdminSystem.findOne()

        // const fee = adminConfig?.commission as number
        const minBalance = adminConfig?.minBalance as number
        
       const fromSenderWallet = await Wallet.findOne({ owner: sender_UserId })
    //    console.log(fromSenderWallet,"sender");
    
    if (!fromSenderWallet || fromSenderWallet.current_status === "BLOCKED") {
        throw new AppError(httpStatus.FORBIDDEN, "Sender wallet not found or blocked")
    }



    if (fromSenderWallet.balance - transferAmount <  minBalance) {
        throw new AppError(httpStatus.FORBIDDEN, `Transfer denied. Minimum balance of ৳${minBalance} must remain in your wallet.`)
    }

    const receiverUser = await User.findOne({ email: receiver_Email })
    
    if (!receiverUser) {
        throw new AppError(httpStatus.NOT_FOUND, "Receiver User Not Found")
    }

    const toReceiverWallet = await Wallet.findOne({ owner: receiverUser._id })

    if (!toReceiverWallet || toReceiverWallet.current_status === "BLOCKED") {
        throw new AppError(httpStatus.FORBIDDEN, "Receiver wallet not found or blocked")
       };
    
       fromSenderWallet.balance -= transferAmount;
       toReceiverWallet.balance += transferAmount;

       await fromSenderWallet.save({ session })
       
       await toReceiverWallet.save({ session })

       await Transaction.create([{
           type: Transaction_Type.TRANSFER,
           amount:transferAmount,
           from: fromSenderWallet._id,
           to: toReceiverWallet._id,
           performedBy: sender_UserId,
           status: Transaction_Status.COMPLETED,
       }],{session})
       await session.commitTransaction()
       session.endSession()

   } catch (error) {
       await session.abortTransaction()
       session.endSession()
       throw error
   }
}


const agentCashIn = async (userEmail:string, agentId:string, amount:number) => {
    const session = await Wallet.startSession();
    session.startTransaction();
    try {
       
        const adminConfig = await AdminSystem.findOne()

        // const fee = adminConfig?.commission as number
        const minBalance = adminConfig?.minBalance as number
        
        const user = await User.findOne({ email: userEmail });
       if (!user) {
           throw new AppError(httpStatus.NOT_FOUND, "User not found");
       };

       const userWallet = await Wallet.findOne({ owner: user._id });
       
       if (!userWallet || userWallet.current_status === "BLOCKED") {
           throw new AppError(httpStatus.FORBIDDEN, "User wallet not found or blocked");
        }
        
        const agentWallet = await Wallet.findOne({ owner: agentId });
        
        if (!agentWallet || agentWallet.current_status === "SUSPEND") {
            throw new AppError(httpStatus.FORBIDDEN, "Agent wallet not found or suspend");
       }
       
    //    console.log(agentWallet.balance,"agent cash in balance",amount,"amount");
       

       if (agentWallet.balance - amount < minBalance) {
           throw new AppError(httpStatus.FORBIDDEN,`Agent has insufficient balance for cash-in . Minimum balance of ৳${minBalance} must remain in your wallet.`)
       }
    
       userWallet.balance += amount;
       agentWallet.balance -= amount


       await userWallet.save({ session })
       await agentWallet.save({session})
       

       await Transaction.create([{
           type: Transaction_Type.CASH_IN,
           to: userWallet._id,
           amount,
           performedBy: agentId,
           status: Transaction_Status.COMPLETED
       }],{session})

       await session.commitTransaction()
       session.endSession()
       
   } catch (error) {
       await session.abortTransaction();
       session.endSession()
       throw error
   }
}

const agentCashOut = async (userEmail:string, agentId:string, amount:number) => {

    const session =await Wallet.startSession()

    session.startTransaction()
    try {

        const adminConfig = await AdminSystem.findOne()

        const transactionFee = adminConfig?.commission as number
        const minBalance = adminConfig?.minBalance as number

        const fee = (amount * transactionFee) / 100;
        const finalAmountAfterFee = amount + fee
        // console.log(fee,"fee");
        
        const user = await User.findOne({ email: userEmail })
        if (!user) {
           throw new AppError(httpStatus.NOT_FOUND, "User not found");
        };

    

        const userWallet = await Wallet.findOne({owner:user._id})
        
        if (!userWallet || userWallet.current_status === "BLOCKED") {
           throw new AppError(httpStatus.FORBIDDEN, "User wallet not found or blocked");
        }

        const agentWallet = await Wallet.findOne({owner:agentId})
        
        if (!agentWallet || agentWallet.current_status === "SUSPEND") {
           throw new AppError(httpStatus.FORBIDDEN, "Agent wallet not found or suspend");
        }
        
        if (userWallet.balance - finalAmountAfterFee < minBalance) {
            throw new AppError(httpStatus.FORBIDDEN,`Insufficient user balance to cover amount and fee. Minimum balance of ৳${minBalance} must remain in your wallet.`)
        }

        agentWallet.balance += finalAmountAfterFee
        userWallet.balance -= finalAmountAfterFee
        // console.log(agentWallet);
        await userWallet.save({ session })
        await agentWallet.save({ session })
        
        await Transaction.create([{
            type: Transaction_Type.CASH_OUT,
            amount,
            commission: fee,
            from: userWallet._id,
            performedBy: agentId,
            status: Transaction_Status.COMPLETED
        }], { session })
        await session.commitTransaction()
        session.endSession()
    } catch (error) {
        await session.abortTransaction()
        session.endSession()
        throw error
    }
}
export const walletService = {
    getMyWallet,
    getAllWallet,
    depositInWallet,
    withdrawInWallet,
    transfer,
    agentCashIn,
    agentCashOut
}