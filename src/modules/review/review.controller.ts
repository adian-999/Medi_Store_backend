
import { Request, Response } from "express"

import { reviewService } from "./review.service"

const createReview = async(req:Request,res:Response)=>{
  try{
    const result = await reviewService.createReview(req.user?.id as string,req.body);

    res.status(201).json({
      success:true,
      data:result,
      message:"review created successfully"
    })

    return result;

  }catch(err){
    res.status(500).json({
      success:false,
      message:"failed to create review",err:(err as Error).message
    })
  }
}

export const reviewController = {
  createReview
}
