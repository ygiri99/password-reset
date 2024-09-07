import { Router } from "express";
import { register, signin, signout, forgotPassword, resetPassword } from "../controllers/authController.js";


const router = Router();

//AUTHENTICATION routes
router.post("/register", register);
router.post("/signin", signin);
router.get("/signout", signout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;