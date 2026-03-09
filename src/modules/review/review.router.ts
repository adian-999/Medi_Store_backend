import express, { Router } from 'express';
import { reviewController } from './review.controller';
import middleAuth, { UserRole } from '../../middleware/authMiddle';

const router = express.Router();

router.post("/",middleAuth(UserRole.CUSTOMER) as any,reviewController.createReview);


export  const reviewRouter:Router=router;;
