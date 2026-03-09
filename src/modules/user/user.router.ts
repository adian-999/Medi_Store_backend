import express, { Router } from "express";
import { userController } from "./user.controller";
import middleAuth, { UserRole } from "../../middleware/authMiddle";

const router = express.Router();

router.delete("/:id",middleAuth(UserRole.ADMIN) as any,userController.deleteUser)

export const userRouter:Router = router;
