// Ye define karta hai ki ye chat kis user ki hai (Foreign Key to User Collection).e schema puri conversation ki identity aur metadata hold karta hai.
import mongoose from 'mongoose'

const chatSchema = new mongoose.Schema({
   userId:{
    type: mongoose.Schema.Types.ObjectId,                      // user id who is user 2
    ref:"user"
   },
   title:{
    type:String,
    require:true
   },
   createdAt:{
    type:Date,
    default: Date.now
   }
})

const chatModel = mongoose.model("chat",chatSchema)
export default chatModel