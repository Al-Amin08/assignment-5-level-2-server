"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const wallet_routes_1 = require("../modules/wallet/wallet.routes");
const transaction_route_1 = require("../modules/transaction/transaction.route");
const admin_route_1 = require("../modules/admin/admin.route");
exports.router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: "/user",
        router: user_routes_1.UserRoutes
    },
    {
        path: "/auth",
        router: auth_routes_1.AuthRoutes
    },
    {
        path: '/wallet',
        router: wallet_routes_1.WalletRoutes
    },
    {
        path: '/transaction',
        router: transaction_route_1.TransactionRoutes
    },
    {
        path: '/admin',
        router: admin_route_1.AdminConfigRoutes
    }
];
moduleRoutes.forEach(route => {
    exports.router.use(route.path, route.router);
});
