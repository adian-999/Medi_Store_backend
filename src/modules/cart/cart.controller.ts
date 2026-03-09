import { success } from "better-auth";
import { Request, Response } from "express";
import { cartService } from "./cart.service";


const addToCart = async(req:Request,res:Response)=>{
  try{
    const result  = await cartService.addToCart(req.user?.id as string,req.body);
    res.status(200).json({
      success:true,
      message:"added to cart",
      data:result
    })

  }catch(err:any){
    res.status(500).json({
      success:false,
      message:err.message
    })
  }
}

const getCart = async(req:Request,res:Response)=>{
  try{
    const result  = await cartService.getCart(req.user?.id as string);
    res.status(200).json({
      success:true,
      message:"cart item retrieved",
      data:result
    })

  }catch(err:any){
    res.status(500).json({
      success:false,
      message:err.message
    })
  }
}

const removeCart = async(req:Request,res:Response)=>{
  const result = await cartService.removeCart(req.params.id as string);

  res.status(200).json({
    success:true,
    message:"cart item removed",
    data:result
  })
}




export const cartController={
  addToCart,
  getCart,
  removeCart
}
