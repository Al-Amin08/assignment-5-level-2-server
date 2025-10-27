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
exports.transactionController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const transaction_service_1 = require("./transaction.service");
const sendResponse_1 = require("../../utils/sendResponse");
const getAllTransaction = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const getAllTransaction = yield transaction_service_1.transactionService.getAllTransaction();
    // console.log(getAllTransaction);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Transaction History Retrieved Successfully",
        data: getAllTransaction
    });
}));
const getMyTransactionHistory = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const ownerId = userId;
    const query = req.query;
    const getTransactionHistory = yield transaction_service_1.transactionService.getMyTransactionHistory(ownerId, query);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Transaction History Retrieved Successfully",
        data: getTransactionHistory
    });
}));
const getCommissionHistory = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const agentId = userId;
    const getCommissionHistory = yield transaction_service_1.transactionService.getCommissionHistory(agentId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "Commission History Retrieved Successfully",
        data: getCommissionHistory
    });
}));
exports.transactionController = {
    getMyTransactionHistory,
    getCommissionHistory,
    getAllTransaction
};
