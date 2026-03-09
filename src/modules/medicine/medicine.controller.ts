import { Request, Response } from "express";
import { mediService } from "./medicine.service";

const createMedi=async(req:Request,res:Response)=>{
  try{
     console.log(req.user);
     const user = req.user;
     if(!user){
      return res.status(401).json({
        success:false,
        message:"you are unauthorized"
      })
     }
    const result = await mediService.createMedi(req.body,user.id as string);
    res.status(201).json(result)

  }catch(err){
    res.status(400).json({
      error:"post creation failed",
      details:err
    })
  }
}

const getAllMedi=async(req:Request,res:Response)=>{
  try{

    const {search}=req.query;

    const result = await mediService.getAllMedi({search:search as string});
    res.status(201).json(result)

  }catch(err){
    res.status(400).json({
      error:"getting all medicine failed",
      details:err
    })
  }
}

const updateMedi=async(req:Request,res:Response)=>{
  try{



    const result = await mediService.updateMedi(req.params.id as string, req.body );
    res.status(201).json(result)

  }catch(err){
    res.status(400).json({
      error:"updating medicine failed",
      details:err
    })
  }
}


const deleteMedi=async(req:Request,res:Response)=>{
  try{



    const result = await mediService.deleteMedi(req.params.id as string);

    res.status(201).json(result)

  }catch(err){
    res.status(400).json({
      error:"deleting medicine failed",
      details:err
    })
  }
}




export const mediController={
  createMedi,
  getAllMedi,
  updateMedi,
  deleteMedi
}

