import { Request, Response } from "express";
import { userService } from "./user.service";


const deleteUser = async(req:Request,res:Response)=>{
  try{
    const id  = req.params.id;
    console.log(id);
    const result = await userService.deleteUser(id as string);

     res.status(200).json({
      success: true,
      message: "User deleted successfully",
      data: result,
    });


  }catch(err){
    res.status(500).json({
      success: false,
      message: "Failed to delete user",
    });
  }
}


export const userController = {
  deleteUser
}
