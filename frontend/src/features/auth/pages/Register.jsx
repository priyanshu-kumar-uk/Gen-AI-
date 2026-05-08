import React from 'react'
import {useForm} from 'react-hook-form'
import { authUser } from '../hooks/auth.hook'
import {useNavigate} from 'react-router-dom'
import './Register.css'

const Register = () => {
 let {register,reset,handleSubmit} = useForm()
 let{registerUser} = authUser()

 const navigate = useNavigate()

 function submitForm(data){
  registerUser(data)
  reset()
  navigate("/")
 }

  return (
    <div className="register-container">
        <form className="register-card" onSubmit={handleSubmit(submitForm)}>
            <h2 className="register-title">Sign Up</h2>
            <input className="register-input" type="text" placeholder="Username" {...register("username",{required:true})} />
            <input className="register-input" type="email" placeholder="Email" {...register("email",{required:true})} />
            <input className="register-input" type="password" placeholder="Password" {...register("password",{required:true})} />
            <button className="register-btn">Sign Up</button>
        </form>
    </div>
  )
}

export default Register