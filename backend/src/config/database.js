import mongoose from 'mongoose'
import config from '../config/config.js'

const dbConnect = async function() {
    try{
         await mongoose.connect(config.MONGO)
         console.log("Database is connected")
    }catch(err){
        console.log(err)
    }
}

export default dbConnect