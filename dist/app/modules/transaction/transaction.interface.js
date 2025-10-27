"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transaction_Type = exports.Transaction_Status = void 0;
var Transaction_Status;
(function (Transaction_Status) {
    Transaction_Status["PENDING"] = "PENDING";
    Transaction_Status["COMPLETED"] = "COMPLETED";
    Transaction_Status["FAILED"] = "FAILED";
})(Transaction_Status || (exports.Transaction_Status = Transaction_Status = {}));
var Transaction_Type;
(function (Transaction_Type) {
    Transaction_Type["TRANSFER"] = "TRANSFER";
    Transaction_Type["CASH_IN"] = "CASH_IN";
    Transaction_Type["CASH_OUT"] = "CASH_OUT";
    Transaction_Type["WITHDRAW"] = "WITHDRAW";
    Transaction_Type["DEPOSIT"] = "DEPOSIT";
})(Transaction_Type || (exports.Transaction_Type = Transaction_Type = {}));
