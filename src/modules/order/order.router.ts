import express, { Router } from "express";
import { orderController } from "./order.controller";
import middleAuth, { UserRole } from "../../middleware/authMiddle";

const router = express.Router();

router.post("/", middleAuth(UserRole.CUSTOMER) as any, orderController.createOrder);

router.get("/",middleAuth(UserRole.ADMIN,UserRole.SELLER) as any, orderController.getAllOrders);

export const orderRouter: Router = router;
