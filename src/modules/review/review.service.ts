import { prisma } from "../../lib/prisma";


const createReview = async(userId:string,payload: any)=>{
  const {medicineId,rating,comment} = payload;

  const medicine = await prisma.medicine.findUnique({
    where:{
      id:medicineId
    }
  })
  if(!medicine){
    throw new Error("medicine not found")
  }

  const review = await prisma.review.create({
    data:{
      userId,
      medicineId,
      rating,
      comment
    }
  })
  return review;


}


export const reviewService = {
  createReview

}
