import { NextFunction, Request, Response } from "express";
import { auth } from "../lib/auth";



export enum UserRole{
  CUSTOMER="CUSTOMER",
  SELLER="SELLER",
  ADMIN="ADMIN"
}

declare global{
  namespace Express{
    interface Request{
      user?:{
        id:string,
        email:string,
        role:string,
        name:string,
        emailVerified:boolean
      }
    }
  }
}



const middleAuth =(...roles:UserRole[])=>{
  try{
    return async (req:Request, res:Response,next:NextFunction)=>{
    const session  = await auth.api.getSession({
      headers:req.headers as any
    })
    if(!session){
      return res.status(401).json({
        success:false,
        message:"you are unauthorized"
      })
    }
    if(!session.user.emailVerified){
      return res.status(403).json({
        success:false,
        message:"email verification is required"
      })
    }
    req.user = {
      id:session.user.id,
      email:session.user.email,
      role:session.user.role as string,
      name:session.user.name,
      emailVerified:session.user.emailVerified
    }
    if(roles.length && !roles.includes(req.user.role as UserRole)){
      return res.status(403).json({
        success:false,
        message:"forbidden"
      })
    }
    next()
  }

  }catch(err){
    next(err)
  }
}

export default middleAuth;
function next(err: unknown) {
  throw new Error("Function not implemented.");
}

