import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import { adminController } from "./admin.controller";

const router = Router()

router.patch("/admin-configs", checkAuth(Role.ADMIN), adminController.updateConfig)


export const AdminConfigRoutes =router