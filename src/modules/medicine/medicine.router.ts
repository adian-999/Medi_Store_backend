
import express, { Router } from "express";
import { mediController } from "./medicine.controller";
import middleAuth, { UserRole } from "../../middleware/authMiddle";



const router = express.Router();

router.delete("/:id",middleAuth(UserRole.ADMIN,UserRole.SELLER) as any, mediController.deleteMedi)

router.patch("/:id",middleAuth(UserRole.ADMIN,UserRole.SELLER) as any, mediController.updateMedi)

router.post("/", middleAuth(UserRole.SELLER,UserRole.ADMIN) as express.RequestHandler, mediController.createMedi)

router.get("/",mediController.getAllMedi)

export const medicineRouter:Router = router;
