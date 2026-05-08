import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'
import config from '../config/config.js'
export const verifyUser = async (req,res,next)=>{
  const token = req.cookies.userTOken

  if(!token){
   return res.status(403).json({
        message:"Unauthorized user",
        success:false
    })
  }
  const decode = jwt.verify(token,config.SECRET_TOKEN)

  if(!decode){
   return res.staus(403).json({
        message:"Invalid token"
    })
  }

  req.user = decode

  next()
}