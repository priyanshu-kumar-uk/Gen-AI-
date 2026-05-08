import mongoose, { mongo } from 'mongoose'

const userSchema = new mongoose.Schema({
    username:{
        type: String
    },

    email:{
        type:String
    },

    password:{
        type:String
    }

})

const userModel = mongoose.model("user",userSchema)

export default userModel