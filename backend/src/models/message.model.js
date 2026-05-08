// Ye schema individual entries here store actual user messages  (User prompts aur AI responses) ko store karta hai.
import mongoose from 'mongoose'

const messageSchema =  new mongoose.Schema({     //3
    chatId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"chat",
        required:true
    },
    role:{
        type:String,
        enum:["user","assistant"],
        required:true
    },
    content:{
        type:String,
        required:true
    },

    createdAt:{
        type:Date,
        default: Date.now
    }
})

const messageModel = mongoose.model("messages",messageSchema)
export default messageModel
