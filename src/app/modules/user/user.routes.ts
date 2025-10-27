import { Router } from "express";
import { validateRequest } from "../../middleware/validateRequest";
import { createUserZodSchema } from "./user.validation";
import { userControllers } from "./user.controller";
import { checkAuth } from "../../middleware/checkAuth";
import {  Role } from "./user.interface";

const router =Router()

router.post("/register", validateRequest(createUserZodSchema), userControllers.createUser)

router.get("/",checkAuth(Role.ADMIN), userControllers.listOfAllUsers)

router.patch("/blockUser/:id",checkAuth(Role.ADMIN),userControllers.blockUser)
router.patch("/unblockUser/:id", checkAuth(Role.ADMIN), userControllers.unblockUser)

router.patch("/approveAgent/:agentId",checkAuth(Role.ADMIN),userControllers.approveAgent)
router.patch("/suspendAgent/:agentId",checkAuth(Role.ADMIN),userControllers.suspendAgent)

export const UserRoutes = router;