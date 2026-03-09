import express, { application, Application } from "express";

import  cors from "cors";
import { medicineRouter } from "./modules/medicine/medicine.router";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import { userRouter } from "./modules/user/user.router";
import { orderRouter } from "./modules/order/order.router";
import { reviewRouter } from "./modules/review/review.router";
import { cartRouter } from "./modules/cart/cart.router";






const app:Application = express();
app.use("/api/auth", toNodeHandler(auth));
app.use(express.json());
app.use(cors(
  {origin:process.env.APP_URL || "http://localhost:4000",
    credentials:true
  }
));

app.use("/cart",cartRouter)

app.use("/reviews",reviewRouter)

app.use("/orders",orderRouter)

app.use("/users",userRouter)

app.use("/medicines",medicineRouter)



app.get("/",(req,res)=>{
  res.send("Welcome to the Medi Store API");
})

export default app;
