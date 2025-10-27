import { Router } from "express"
import { walletControllers } from "./wallet.controller"
import { checkAuth } from "../../middleware/checkAuth";

import { Role } from "../user/user.interface";
import { validateRequest } from "../../middleware/validateRequest";
import { agentCashZodSchema, depositZodSchema, transferZodSchema, withdrawZodSchema } from "./wallet.validation";

const router =Router()

router.get("/", checkAuth(...Object.values(Role)), walletControllers.getMyWallet)
router.get("/all-wallets",checkAuth(Role.ADMIN),walletControllers.getAllWallet)

router.post("/deposit", checkAuth(...Object.values(Role)),validateRequest(depositZodSchema),walletControllers.deposit)
router.post("/withdraw", checkAuth(...Object.values(Role)),validateRequest(withdrawZodSchema),walletControllers.withdraw)
router.post("/transfer", checkAuth(...Object.values(Role)),validateRequest(transferZodSchema),walletControllers.transfer)


router.post("/agent/cashIn", checkAuth(Role.AGENT),validateRequest(agentCashZodSchema),walletControllers.agentCashIn)
router.post("/agent/cashOut", checkAuth(Role.AGENT),validateRequest(agentCashZodSchema),walletControllers.agentCashOut)

export const WalletRoutes = router;