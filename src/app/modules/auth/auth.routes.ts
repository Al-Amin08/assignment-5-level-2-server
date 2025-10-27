import { Router } from "express";
import { AuthController } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";

const router = Router();

router.post("/login",AuthController.credentialsLogin)
router.post("/logout", AuthController.logOut)
router.post("/reset-password", checkAuth(...Object.values(Role)), AuthController.resetPassword)

export const AuthRoutes = router;
