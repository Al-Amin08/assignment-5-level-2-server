"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const AppError_1 = __importDefault(require("../errorHelper/AppError"));
const env_1 = require("../config/env");
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 500;
    let message = `Something went wrong`;
    if (error instanceof AppError_1.default) {
        statusCode = error.statusCode;
        message = error.message;
    }
    else if (error instanceof Error) {
        statusCode = 500;
        message = error.message;
    }
    res.status(statusCode).json({
        success: false,
        message,
        error,
        stack: env_1.envVars.NODE_ENV === "development" ? error.stack : null
    });
};
exports.globalErrorHandler = globalErrorHandler;
