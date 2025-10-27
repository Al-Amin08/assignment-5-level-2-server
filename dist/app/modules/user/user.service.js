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
exports.UserService = void 0;
/* eslint-disable prefer-const */
/* eslint-disable no-console */
const AppError_1 = __importDefault(require("../../errorHelper/AppError"));
const user_interface_1 = require("./user.interface");
const user_model_1 = require("./user.model");
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const wallet_model_1 = require("../wallet/wallet.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, password, role, current_status } = payload;
    console.log(name, email, password, role, current_status);
    const isUserExist = yield user_model_1.User.findOne({ email });
    if (isUserExist) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "User Already Exist");
    }
    if (role === user_interface_1.Role.AGENT) {
        current_status = user_interface_1.Current_Status.APPROVE;
    }
    const hashPassword = yield bcryptjs_1.default.hash(password, 10);
    const user = yield user_model_1.User.create({
        name,
        email,
        password: hashPassword,
        role, current_status
    });
    yield wallet_model_1.Wallet.create({ owner: user._id, balance: 50 });
    return user;
});
// const updateUser = async (userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {
//     const isUserExist=await User.findById(userId)
//     if (!isUserExist) {
//         throw new AppError(httpStatus.NOT_FOUND,"User not Found.")
//     }
//     if (payload.role) {
//         if (decodedToken.role === Role.USER || decodedToken.role === Role.AGENT) {
//             throw new AppError(httpStatus.FORBIDDEN,"YOu are not Authorized")
//         }
//         if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
//             throw new AppError(httpStatus.FORBIDDEN,"YOu are not Authorized")
//         }
//     }
//     if (payload.password) {
//         payload.password=await bcryptjs.hash(payload.password,10)
//     }
//     const newUpdateUser = await User.findByIdAndUpdate(userId, payload, { new: true, runValidators: true })
//     return newUpdateUser 
// }
const listOfAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const page = query.page || 1;
    const limit = query.limit || 5;
    const skip = (+page - 1) * +limit;
    console.log({ page: page, limit, skip });
    const users = yield user_model_1.User.find()
        .skip(skip)
        .limit(+limit)
        .select("-password");
    return users;
});
const blockUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByIdAndUpdate(id, { current_status: user_interface_1.Current_Status.BLOCKED }, { new: true, runValidators: true });
    yield wallet_model_1.Wallet.findOneAndUpdate({ owner: id }, { current_status: user_interface_1.Current_Status.BLOCKED });
    return user;
});
const unblockUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findByIdAndUpdate(id, { current_status: user_interface_1.Current_Status.UNBLOCKED }, { new: true, runValidators: true });
    yield wallet_model_1.Wallet.findOneAndUpdate({ owner: id }, { current_status: user_interface_1.Current_Status.UNBLOCKED });
    return user;
});
const approveAgent = (agentId) => __awaiter(void 0, void 0, void 0, function* () {
    const approveAgent = yield user_model_1.User.findByIdAndUpdate(agentId, { current_status: user_interface_1.Current_Status.APPROVE }, { new: true, runValidators: true });
    yield wallet_model_1.Wallet.findOneAndUpdate({ owner: agentId }, { current_status: user_interface_1.Current_Status.APPROVE });
    return approveAgent;
});
const suspendAgent = (agentId) => __awaiter(void 0, void 0, void 0, function* () {
    const suspendAgent = yield user_model_1.User.findByIdAndUpdate(agentId, { current_status: user_interface_1.Current_Status.SUSPEND }, { new: true, runValidators: true });
    yield wallet_model_1.Wallet.findOneAndUpdate({ owner: agentId }, { current_status: user_interface_1.Current_Status.SUSPEND });
    return suspendAgent;
});
exports.UserService = {
    createUser,
    // updateUser
    listOfAllUsers,
    blockUser,
    unblockUser,
    approveAgent,
    suspendAgent
};
