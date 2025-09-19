import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken" ;
import dotenv from "dotenv";
dotenv.config()
export function createUser (req,res){
   if(req.body.role == "admin"){
      if(req.user != null){
        if(req.user.role != "admin"){
          res.status(403).json({
          message : "You are not authorized to create an admin please login first"
        })
         return

        }

      }else{
        res.status(403).json({
          message : "You are not authorized to create an admin please login first"
        })
        return
      }
   }

  const hashedpassword = bcrypt.hashSync(req.body.password,10)

    const user = new User ({
        firstName : req.body.firstName,
        lastName : req.body.lastName,
        email : req.body.email,
        password : hashedpassword,
        role: req.body.role
    })


    user.save().then(()=>{
        res.json({
          message : "User create SuccessFullly"
        })
     }).catch(()=>{
       res.json({
         message : "Failed to create User"
       })
     })
  


}

export function loginUser (req,res){
  const email = req.body.email
  const password = req.body.password
  User.findOne({email:email}).then(
    (user)=>{
       if(user==null){
        res.status(404).json({
          message : "User not found"
        })
       }else{
         const isPasswordcorrect = bcrypt.compareSync(password,user.password)
                    if(isPasswordcorrect){
                        const token = jwt.sign({
                           email : user.email,
                           firstName : user.firstName,
                           lastName : user.lastName,
                           role : user.role,
                           img : user.img
                        },
                       process.env.JWT_KEY
                      )

                      res.json({
                        message : "Login Successful",
                       token:token
                      })
                    }else{
                      res.status(401).json({
                        message : "Invalid password"
                      })
                    }
       }
    }
  )
}

export function isAdmin(req){
  if(req.user==null){
    return false
  }
 if(req.user.role!= "admin"){
  return false
 }
  return true
}