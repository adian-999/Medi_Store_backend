import { includes } from "better-auth";
import { prisma } from "../../lib/prisma";


const addToCart = async(userId:string,payload:any)=>{
  const {medicineId,quantity} = payload;

  let cart = await prisma.cart.findFirst({
    where:{
      userId
    }
  })

  if(!cart){
    cart = await prisma.cart.create({
      data:{
        userId
      }
    })
  }

  const existingItem = await prisma.cartItem.findFirst({
    where:{
      cartId:cart.id,
      medicineId
    }
  })

  if(existingItem){
    const updatedItem  = await prisma.cartItem.update({
      where:{
        id:existingItem.id
      },
      data:{
        quantity:existingItem.quantity + quantity
      }
    })
  }

  const cartItem = await prisma.cartItem.create({
    data:{
      cartId:cart.id,
      medicineId,
      quantity
    }
  })
  return cartItem;

}

const getCart = async(userId:string)=>{
  const cartItems = await prisma.cartItem.findMany({
    where:{
      cart:{
        userId
      }
    },
    include:{
      cart:true
    }
  })
  return cartItems;
}

const removeCart = async(id:string)=>{
  return await prisma.cartItem.delete({
    where:{
      id
    }
  })
}


export const cartService={
  addToCart,
  getCart,
  removeCart
}


