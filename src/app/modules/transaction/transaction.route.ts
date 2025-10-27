import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { transactionController } from "./transaction.controller";

const router = Router();


router.get("/my-transactions",checkAuth(...Object.values(Role)),transactionController.getMyTransactionHistory)
router.get("/commission-histories", checkAuth(Role.AGENT, Role.ADMIN), transactionController.getCommissionHistory)

router.get("/all-transactions",checkAuth(Role.ADMIN),transactionController.getAllTransaction)


export const TransactionRoutes = router