import { prisma } from "../../lib/prisma";


const createOrder=async(userId:string,payload:any)=>{

  const {items,address}=payload;

  return await prisma.$transaction(async(tx)=>{
     let total= 0;
     let medicine;
     for(const item of items){
      medicine = await tx.medicine.findUnique({
        where:{
          id:item.medicineId
        }
      })
      if(!medicine){
        throw new Error("Medicine not found")
      }
      if(medicine.stock<item.quantity){
        throw new Error("not enough stock for this medicine")
      }

      total+=medicine.price*item.quantity;
     }

     const order = await tx.order.create({
      data:{
        userId:userId,
        total,
        address
      }
     })

     for(const item of items){
      const medicine = await tx.medicine.findUnique({
        where:{
          id:item.medicineId
        }
      })
      await tx.orderItem.create({
        data:{
          orderId:order.id,
          medicineId:item.medicineId,
          quantity:item.quantity,
          price:medicine?.price as number
        }
      })

      await tx.medicine.update({
        where:{
          id:item.medicineId
        },
        data:{
          stock:{
            decrement:item.quantity
          }
        }
      })

     }

     return order;


  })

}

const getAllOrders=async()=>{
  const result = await prisma.order.findMany({
    include:{
      items:true
    }
  })
  return result
}


export const orderService={
  createOrder,
  getAllOrders
}
