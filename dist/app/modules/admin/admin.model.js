"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminSystem = void 0;
const mongoose_1 = require("mongoose");
const adminSystemSchema = new mongoose_1.Schema({
    commission: { type: Number, required: true, default: 1 },
    minBalance: { type: Number, required: true, default: 10 },
    updatedBy: { type: String, default: "ADMIN" },
    adminId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true, versionKey: false
});
exports.AdminSystem = (0, mongoose_1.model)("AdminSystem", adminSystemSchema);
