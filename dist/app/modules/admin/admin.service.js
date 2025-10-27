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
exports.adminService = void 0;
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
const admin_model_1 = require("./admin.model");
const setConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    let config = yield admin_model_1.AdminSystem.findOne();
    if (config) {
        console.log("Already exist");
        return;
    }
    if (!config) {
        config = yield admin_model_1.AdminSystem.create({
            commission: 1,
            minBalance: 10,
            updatedBy: "system-initial"
        });
    }
    return config;
});
const updateConfig = (commission, minBalance, adminId) => __awaiter(void 0, void 0, void 0, function* () {
    let config = yield admin_model_1.AdminSystem.findOne();
    if (!config) {
        config = yield admin_model_1.AdminSystem.create({
            commission,
            minBalance,
            adminId
        });
    }
    else {
        config.minBalance = minBalance;
        config.commission = commission;
        config.adminId = adminId;
        config.updatedBy = "ADMIN";
        yield config.save();
    }
    return config;
});
exports.adminService = {
    setConfig,
    updateConfig
};
