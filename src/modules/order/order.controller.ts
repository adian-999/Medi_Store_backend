
import { Request, Response } from "express"
import { orderService } from "./order.service"


const createOrder=async(req:Request,res:Response)=>{
  try{

    const result = await orderService.createOrder(req.user?.id as string,req.body);
    res.status(201).json(result)

  }catch(err:any){
    res.status(500).json({
      success:false,
      message:err.message

    })
  }
}


const getAllOrders=async(req:Request,res:Response)=>{
  try{

    const result = await orderService.getAllOrders();
    res.status(200).json(result)

  }catch(err:any){
    res.status(500).json({
      success:false,
      message:err.message

    })
  }
}

const updateOrderStatus=async(req:Request,res:Response)=>{
  try{

    const result = await orderService.updateOrderStatus(req.params.id as string, req.body.status as string);
    res.status(200).json(result)

  }catch(err:any){
    res.status(500).json({
      success:false,
      message:err.message

    })
  }
}

export const orderController={
  createOrder,
  getAllOrders,
  updateOrderStatus
}
