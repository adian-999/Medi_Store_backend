import express, { Router } from "express";
import { userController } from "./user.controller";

const router = express.Router();

router.delete("/:id",userController.deleteUser)

export const userRouter:Router = router;
