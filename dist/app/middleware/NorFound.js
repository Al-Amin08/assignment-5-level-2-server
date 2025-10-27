"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFound = void 0;
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const NotFound = (req, res) => {
    res.status(http_status_codes_1.default.NOT_FOUND).json({
        success: false,
        message: "Route Not Found"
    });
};
exports.NotFound = NotFound;
