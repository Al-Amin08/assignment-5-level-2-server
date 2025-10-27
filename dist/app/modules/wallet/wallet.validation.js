"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.agentCashZodSchema = exports.transferZodSchema = exports.withdrawZodSchema = exports.depositZodSchema = void 0;
const zod_1 = require("zod");
exports.depositZodSchema = zod_1.z.object({
    amount: zod_1.z.number().positive()
});
exports.withdrawZodSchema = zod_1.z.object({
    amount: zod_1.z.number().positive()
});
exports.transferZodSchema = zod_1.z.object({
    receiver_Email: zod_1.z.email(),
    amount: zod_1.z.number().positive()
});
exports.agentCashZodSchema = zod_1.z.object({
    userEmail: zod_1.z.email(),
    amount: zod_1.z.number().positive()
});
