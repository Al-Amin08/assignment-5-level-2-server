"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletService = void 0;
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const admin_model_1 = require("../admin/admin.model");
const transaction_interface_1 = require("../transaction/transaction.interface");
const transaction_model_1 = require("../transaction/transaction.model");
const user_model_1 = require("../user/user.model");
const wallet_model_1 = require("./wallet.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const getAllWallet = () => __awaiter(void 0, void 0, void 0, function* () {
    const allWallets = yield wallet_model_1.Wallet.find().populate('owner', "name email role ");
    return allWallets;
});
const getMyWallet = (ownerId) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findOne({ owner: ownerId });
    return wallet;
});
const depositInWallet = (depositAmount, ownerId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield wallet_model_1.Wallet.startSession();
    session.startTransaction();
    try {
        const wallet = yield wallet_model_1.Wallet.findOne({ owner: ownerId });
        if (!wallet || wallet.current_status === "BLOCKED") {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Wallet not found or blocked");
        }
        wallet.balance += depositAmount;
        yield wallet.save({ session });
        yield transaction_model_1.Transaction.create([{
                type: transaction_interface_1.Transaction_Type.DEPOSIT,
                amount: depositAmount,
                to: wallet._id,
                performedBy: ownerId,
                status: transaction_interface_1.Transaction_Status.COMPLETED
            }], { session });
        yield session.commitTransaction();
        session.endSession();
    }
    catch (_a) {
        yield session.abortTransaction();
        session.endSession();
    }
});
const withdrawInWallet = (withdrawAmount, ownerId) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield wallet_model_1.Wallet.startSession();
    session.startTransaction();
    try {
        const adminConfig = yield admin_model_1.AdminSystem.findOne();
        // const fee = adminConfig?.commission
        const minBalance = adminConfig === null || adminConfig === void 0 ? void 0 : adminConfig.minBalance;
        const wallet = yield wallet_model_1.Wallet.findOne({ owner: ownerId });
        if (!wallet || wallet.current_status === "BLOCKED") {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Wallet not found or blocked");
        }
        if (wallet.balance - withdrawAmount < minBalance) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, `Withdrawal denied. Minimum balance of ৳${minBalance} must remain in your wallet.`);
        }
        wallet.balance -= withdrawAmount;
        yield wallet.save({ session });
        yield transaction_model_1.Transaction.create([{
                type: transaction_interface_1.Transaction_Type.WITHDRAW,
                amount: withdrawAmount,
                from: wallet._id,
                performedBy: ownerId,
                status: transaction_interface_1.Transaction_Status.COMPLETED
            }], { session });
        yield session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const transfer = (receiver_Email, sender_UserId, transferAmount) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield wallet_model_1.Wallet.startSession();
    session.startTransaction();
    try {
        const adminConfig = yield admin_model_1.AdminSystem.findOne();
        // const fee = adminConfig?.commission as number
        const minBalance = adminConfig === null || adminConfig === void 0 ? void 0 : adminConfig.minBalance;
        const fromSenderWallet = yield wallet_model_1.Wallet.findOne({ owner: sender_UserId });
        //    console.log(fromSenderWallet,"sender");
        if (!fromSenderWallet || fromSenderWallet.current_status === "BLOCKED") {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Sender wallet not found or blocked");
        }
        if (fromSenderWallet.balance - transferAmount < minBalance) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, `Transfer denied. Minimum balance of ৳${minBalance} must remain in your wallet.`);
        }
        const receiverUser = yield user_model_1.User.findOne({ email: receiver_Email });
        if (!receiverUser) {
            throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Receiver User Not Found");
        }
        const toReceiverWallet = yield wallet_model_1.Wallet.findOne({ owner: receiverUser._id });
        if (!toReceiverWallet || toReceiverWallet.current_status === "BLOCKED") {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Receiver wallet not found or blocked");
        }
        ;
        fromSenderWallet.balance -= transferAmount;
        toReceiverWallet.balance += transferAmount;
        yield fromSenderWallet.save({ session });
        yield toReceiverWallet.save({ session });
        yield transaction_model_1.Transaction.create([{
                type: transaction_interface_1.Transaction_Type.TRANSFER,
                amount: transferAmount,
                from: fromSenderWallet._id,
                to: toReceiverWallet._id,
                performedBy: sender_UserId,
                status: transaction_interface_1.Transaction_Status.COMPLETED,
            }], { session });
        yield session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const agentCashIn = (userEmail, agentId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield wallet_model_1.Wallet.startSession();
    session.startTransaction();
    try {
        const adminConfig = yield admin_model_1.AdminSystem.findOne();
        // const fee = adminConfig?.commission as number
        const minBalance = adminConfig === null || adminConfig === void 0 ? void 0 : adminConfig.minBalance;
        const user = yield user_model_1.User.findOne({ email: userEmail });
        if (!user) {
            throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
        }
        ;
        const userWallet = yield wallet_model_1.Wallet.findOne({ owner: user._id });
        if (!userWallet || userWallet.current_status === "BLOCKED") {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "User wallet not found or blocked");
        }
        const agentWallet = yield wallet_model_1.Wallet.findOne({ owner: agentId });
        if (!agentWallet || agentWallet.current_status === "SUSPEND") {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Agent wallet not found or suspend");
        }
        //    console.log(agentWallet.balance,"agent cash in balance",amount,"amount");
        if (agentWallet.balance - amount < minBalance) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, `Agent has insufficient balance for cash-in . Minimum balance of ৳${minBalance} must remain in your wallet.`);
        }
        userWallet.balance += amount;
        agentWallet.balance -= amount;
        yield userWallet.save({ session });
        yield agentWallet.save({ session });
        yield transaction_model_1.Transaction.create([{
                type: transaction_interface_1.Transaction_Type.CASH_IN,
                to: userWallet._id,
                amount,
                performedBy: agentId,
                status: transaction_interface_1.Transaction_Status.COMPLETED
            }], { session });
        yield session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
const agentCashOut = (userEmail, agentId, amount) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield wallet_model_1.Wallet.startSession();
    session.startTransaction();
    try {
        const adminConfig = yield admin_model_1.AdminSystem.findOne();
        const transactionFee = adminConfig === null || adminConfig === void 0 ? void 0 : adminConfig.commission;
        const minBalance = adminConfig === null || adminConfig === void 0 ? void 0 : adminConfig.minBalance;
        const fee = (amount * transactionFee) / 100;
        const finalAmountAfterFee = amount + fee;
        // console.log(fee,"fee");
        const user = yield user_model_1.User.findOne({ email: userEmail });
        if (!user) {
            throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "User not found");
        }
        ;
        const userWallet = yield wallet_model_1.Wallet.findOne({ owner: user._id });
        if (!userWallet || userWallet.current_status === "BLOCKED") {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "User wallet not found or blocked");
        }
        const agentWallet = yield wallet_model_1.Wallet.findOne({ owner: agentId });
        if (!agentWallet || agentWallet.current_status === "SUSPEND") {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, "Agent wallet not found or suspend");
        }
        if (userWallet.balance - finalAmountAfterFee < minBalance) {
            throw new AppError_1.default(http_status_codes_1.default.FORBIDDEN, `Insufficient user balance to cover amount and fee. Minimum balance of ৳${minBalance} must remain in your wallet.`);
        }
        agentWallet.balance += finalAmountAfterFee;
        userWallet.balance -= finalAmountAfterFee;
        // console.log(agentWallet);
        yield userWallet.save({ session });
        yield agentWallet.save({ session });
        yield transaction_model_1.Transaction.create([{
                type: transaction_interface_1.Transaction_Type.CASH_OUT,
                amount,
                commission: fee,
                from: userWallet._id,
                performedBy: agentId,
                status: transaction_interface_1.Transaction_Status.COMPLETED
            }], { session });
        yield session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
exports.walletService = {
    getMyWallet,
    getAllWallet,
    depositInWallet,
    withdrawInWallet,
    transfer,
    agentCashIn,
    agentCashOut
};
