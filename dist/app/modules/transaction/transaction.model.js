"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction = void 0;
const mongoose_1 = require("mongoose");
const transaction_interface_1 = require("./transaction.interface");
const transactionSchema = new mongoose_1.Schema({
    type: {
        type: String,
        enum: Object.values(transaction_interface_1.Transaction_Type),
        required: true
    },
    amount: { type: Number, required: true, min: 0 },
    from: { type: mongoose_1.Schema.Types.ObjectId, ref: "Wallet" },
    to: { type: mongoose_1.Schema.Types.ObjectId, ref: "Wallet" },
    performedBy: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    status: {
        type: String,
        enum: Object.values(transaction_interface_1.Transaction_Status),
        default: transaction_interface_1.Transaction_Status.PENDING
    },
    commission: { type: Number, default: 0 },
    metaData: { type: mongoose_1.Schema.Types.Mixed }
}, { timestamps: true, versionKey: false });
exports.Transaction = (0, mongoose_1.model)("Transaction", transactionSchema);
