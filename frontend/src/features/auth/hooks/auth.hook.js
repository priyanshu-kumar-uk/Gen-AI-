import {registerApi} from '../services/auth.api.js'

export const authUser = ()=>{

    const registerUser = async({username,email,password})=>{
      let data = await registerApi({username,email,password})
      console.log(data)
    }

    return {
        registerUser
    }
}