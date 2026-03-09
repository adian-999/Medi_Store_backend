import express, { Router } from "express";
import { cartController } from "./cart.controller";
import middleAuth, { UserRole } from "../../middleware/authMiddle";

const router = express.Router();

router.delete("/:id",middleAuth(UserRole.CUSTOMER) as any, cartController.removeCart);

router.get("/all",middleAuth(UserRole.CUSTOMER) as any, cartController.getCart);

router.post("/",middleAuth(UserRole.CUSTOMER) as any,cartController.addToCart);


export const cartRouter:Router = router;
