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
Object.defineProperty(exports, "__esModule", { value: true });
exports.walletControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const wallet_service_1 = require("./wallet.service");
const getMyWallet = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const ownerId = userId;
    const wallet = yield wallet_service_1.walletService.getMyWallet(ownerId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "get my wallet Successfully",
        data: wallet
    });
}));
const getAllWallet = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllWallet = yield wallet_service_1.walletService.getAllWallet();
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "All  wallet retrieved Successfully",
        data: getAllWallet
    });
}));
const deposit = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount } = req.body;
    const depositAmount = amount;
    // console.log(depositAmount);
    const { userId } = req.user;
    const ownerId = userId;
    const depositInWallet = yield wallet_service_1.walletService.depositInWallet(depositAmount, ownerId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Deposit money to your wallet Successfully",
        data: depositInWallet
    });
}));
const withdraw = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { amount } = req.body;
    const withdrawAmount = amount;
    // console.log(withdrawAmount);
    const { userId } = req.user;
    const ownerId = userId;
    const withdrawInWallet = yield wallet_service_1.walletService.withdrawInWallet(withdrawAmount, ownerId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Withdraw money from your wallet Successfully",
        data: withdrawInWallet
    });
}));
const transfer = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { receiver_Email, amount } = req.body;
    const { userId } = req.user;
    const fromUserId = userId;
    const transferAmount = amount;
    // console.log(receiver_Email,fromUserId,amount,"from transfer controllers");
    const transfer = yield wallet_service_1.walletService.transfer(receiver_Email, fromUserId, transferAmount);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Transfer money from your wallet Successfully",
        data: transfer
    });
}));
const agentCashIn = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail, amount } = req.body;
    const { userId } = req.user;
    const agentId = userId;
    const agentCashIn = yield wallet_service_1.walletService.agentCashIn(userEmail, agentId, amount);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Cash In done Successfully",
        data: agentCashIn
    });
}));
const agentCashOut = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userEmail, amount } = req.body;
    const { userId } = req.user;
    const agentId = userId;
    const agentCashOut = yield wallet_service_1.walletService.agentCashOut(userEmail, agentId, amount);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Cash Out done Successfully",
        data: agentCashOut
    });
}));
exports.walletControllers = {
    getMyWallet,
    getAllWallet,
    deposit,
    withdraw,
    transfer,
    agentCashIn,
    agentCashOut,
};
