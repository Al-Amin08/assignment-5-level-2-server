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
exports.adminController = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const admin_service_1 = require("./admin.service");
const setConfig = () => __awaiter(void 0, void 0, void 0, function* () {
    // const {userId} =req.user as JwtPayload
    // const adminId =userId
    // const setConfig =await adminService.setConfig()
    //   sendResponse(res, {
    //       statusCode: 201,
    //       success: true,
    //       message: "Initial config set Successfully",
    //       data: setConfig
    //   })
    try {
        const setConfig = yield admin_service_1.adminService.setConfig();
        console.log("Initial config set Successfully");
    }
    catch (error) {
        console.log(error);
    }
});
const updateConfig = (0, catchAsync_1.catchAsync)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.user;
    const adminId = userId;
    const { commission, minBalance } = req.body;
    const updateConfig = yield admin_service_1.adminService.updateConfig(commission, minBalance, adminId);
    (0, sendResponse_1.sendResponse)(res, {
        statusCode: 201,
        success: true,
        message: "New config set Successfully",
        data: updateConfig
    });
}));
exports.adminController = {
    setConfig,
    updateConfig
};
