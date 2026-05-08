import userModel from '../models/user.model.js'
import argon2 from 'argon2'
import jwt from 'jsonwebtoken'
import config from '../config/config.js'
export async function register(req,res){
    const {username,email,password} = req.body

    const exitsUser =  await userModel.findOne({email})
    if(exitsUser){
        return res.status(403).json({
            message:"User already registerd",
            success:false
        })
    }
    const hashPassword = argon2.hash(password)
    const user = await userModel.create({
        username:username,
        email:email,
        password:password
    })
     
   const userToken = jwt.sign({
        id:user._id
    },config.SECRET_TOKEN,{expiresIn:"10d"})

    res.cookie("userTOken",userToken)

    res.status(201).json({
        message:"User registerd successfully",
        success:true,
        user
    })

}

