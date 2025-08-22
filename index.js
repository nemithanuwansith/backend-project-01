import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import productRouter from './Routes/productRoutes.js';
import userRouter from './Routes/userRouter.js';
import jwt from "jsonwebtoken";
const app = express();
app.use (bodyParser.json())

app.use(
  (req,res,next)=>{
    const tokenString = req.header ("Authorization")
       if(tokenString != null){
          const token = tokenString.replace("Bearer ", "")

      jwt.verify (token,"nemi-nuwansith-one#2025",
        (err,decoded)=>{
          if (decoded != null){
            req.user = decoded
            next()
        
          }else{
             console.log("Invalid token")
             res.status(403).json({
               message : "Invalid Token"
             })
          }
        }
      )  
           
       }else{
        next()
       }
   
    
    
  

}
)

mongoose.connect ("mongodb+srv://admin:123@cluster01.tw0vlnk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster01")
.then(()=>
{
  console.log("Connected to the database")
}).catch(()=>{
  console.log ("Database Connection failed")
}
)
   

app.use("/products",productRouter)
app.use("/users",userRouter)

app.listen(4000,
  ()=>{
    console.log("server is running on port 4000");
  }
)  