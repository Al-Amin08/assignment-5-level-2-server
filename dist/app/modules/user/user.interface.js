"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Current_Status = exports.Role = void 0;
var Role;
(function (Role) {
    Role["SUPER_ADMIN"] = "SUPER_ADMIN";
    Role["ADMIN"] = "ADMIN";
    Role["AGENT"] = "AGENT";
    Role["USER"] = "USER";
})(Role || (exports.Role = Role = {}));
var Current_Status;
(function (Current_Status) {
    // for user
    Current_Status["BLOCKED"] = "BLOCKED";
    Current_Status["UNBLOCKED"] = "UNBLOCKED";
    // for agent
    Current_Status["APPROVE"] = "APPROVE";
    Current_Status["SUSPEND"] = "SUSPEND";
})(Current_Status || (exports.Current_Status = Current_Status = {}));
