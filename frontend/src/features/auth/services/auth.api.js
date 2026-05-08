import axios from 'axios'

export const registerApi = async( {username,email,password})=>{
 const res =  await axios.post("http://localhost:4000/api/auth/register",{
    username,
    email,
    password
  },{withCredentials:true})

  return res.data
}