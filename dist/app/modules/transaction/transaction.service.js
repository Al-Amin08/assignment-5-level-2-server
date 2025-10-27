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
exports.transactionService = void 0;
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const wallet_model_1 = require("../wallet/wallet.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const transaction_model_1 = require("./transaction.model");
const getAllTransaction = () => __awaiter(void 0, void 0, void 0, function* () {
    const transaction = yield transaction_model_1.Transaction.find()
        .sort({ createdAt: -1 })
        .populate("performedBy", "_id role")
        .populate("from", "owner ")
        .populate("to", "owner ");
    // console.log(transaction);
    return transaction;
});
const getMyTransactionHistory = (ownerId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const wallet = yield wallet_model_1.Wallet.findOne({ owner: ownerId });
    const page = query.page || 1;
    const limit = query.limit || 5;
    const skip = (+page - 1) * +limit;
    if (!wallet) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Wallet not found");
    }
    const transactions = yield transaction_model_1.Transaction.find({})
        .skip(skip)
        .limit(+limit)
        .sort({ createdAt: -1 });
    // console.log(transactions,wallet);
    return transactions;
});
const getCommissionHistory = (agentId) => __awaiter(void 0, void 0, void 0, function* () {
    const transactions = yield transaction_model_1.Transaction.find({
        performedBy: agentId,
        commission: { $gt: 0 }
    })
        .sort({ createdAt: -1 });
    return transactions;
});
exports.transactionService = {
    getMyTransactionHistory,
    getCommissionHistory,
    getAllTransaction
};
