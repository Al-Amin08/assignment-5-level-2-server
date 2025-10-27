import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { WalletRoutes } from "../modules/wallet/wallet.routes";
import { TransactionRoutes } from "../modules/transaction/transaction.route";
import { AdminConfigRoutes } from "../modules/admin/admin.route";

export const router=Router()

const moduleRoutes = [
    {
        path: "/user",
        router: UserRoutes
    },
    {
        path: "/auth",
        router:AuthRoutes
    },
    {
        path: '/wallet',
        router: WalletRoutes
    },
    {
        path: '/transaction',
        router: TransactionRoutes
    },
    {
        path: '/admin',
        router:AdminConfigRoutes
    }
]

moduleRoutes.forEach(route => {
    router.use(route.path, route.router);
})