import e from "express";
import { getUsers, createUser, getUserById, updateUserById, deleteUserById } from "../controllers/userController.js";
import { isAuth } from "../utils/authentication.js";
import { isAdmin, isUser } from "../utils/autherization.js";

const router = e.Router();

//USER routes
router.get("/users", isAuth, isAdmin, getUsers)
router.post("/users", createUser);
router.get("/user/", isAuth, isUser, getUserById);
router.put("/user/:id", isAuth, updateUserById);
router.delete("/user/:id", isAuth, deleteUserById);

export default router;