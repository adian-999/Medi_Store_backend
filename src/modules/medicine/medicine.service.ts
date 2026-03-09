
import { Medicine } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";


const createMedi = async(data:Omit<Medicine ,"id"|"createdAt"|"sellerId">,userId:string)=>{
  const result = await prisma.medicine.create({
    data:{
      ...data,
      sellerId:userId
    }
  })
  return result

}

const getAllMedi=async(payload:{search?:string})=>{
  const result = await prisma.medicine.findMany({
    where:{
      name:{
        contains:payload.search as string,
        mode:"insensitive"
      }
    }
  });
  return result
}

const updateMedi = async(id:string,payload:any)=>{
  const medicine = await prisma.medicine.findUnique({
    where:{
      id
    }

  })

  if(!medicine){
    throw new Error("Medicine not found")
  }

  const result = await prisma.medicine.update({
    where:{
      id
    },
    data:payload
  })
  return result;


}

const deleteMedi = async(id:string)=>{
  const medicine =await prisma.medicine.findUnique({
    where:{
      id
    }
  })
  if(!medicine){
    throw new Error("Medicine not found")
  }
  const result = await prisma.medicine.delete({
    where:{
      id
    }
  })
  return result;
}





export const mediService={
  createMedi,
  getAllMedi,
  updateMedi,
  deleteMedi
}

