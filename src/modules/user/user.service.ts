import { prisma } from "../../lib/prisma"


const deleteUser = async(userId:string)=>{
  const result = await prisma.user.delete({
    where:{
      id:userId

    }
  })
  return result
}

export const userService ={
  deleteUser
}
