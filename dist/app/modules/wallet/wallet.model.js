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
exports.Wallet = void 0;
const mongoose_1 = require("mongoose");
const user_interface_1 = require("../user/user.interface");
const walletSchema = new mongoose_1.Schema({
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    balance: { type: Number, required: true, default: 50, min: 0 },
    current_status: {
        type: String,
        enum: Object.values(user_interface_1.Current_Status),
        default: user_interface_1.Current_Status.UNBLOCKED
    }
}, {
    timestamps: true,
    versionKey: false
});
walletSchema.static("updateAvailability", function (ownerId) {
    return __awaiter(this, void 0, void 0, function* () {
        const wallet = yield this.findById({ owner: ownerId });
        if (wallet) {
            wallet.current_status = wallet.current_status >= 0 ? wallet.current_status.BLOCKED : wallet.current_status.UNBLOCKED;
        }
    });
});
exports.Wallet = (0, mongoose_1.model)("Wallet", walletSchema);
