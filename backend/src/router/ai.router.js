import {Router} from 'express'
import {getChatMessages, getUserChats, handleMessage} from '../controller/ai.controller.js'
import { verifyUser } from '../middleware/verifyUser.js'

const chatRouter = Router()

chatRouter.post("/chat",verifyUser,handleMessage)  
chatRouter.get("/chat/:chatId",verifyUser,getChatMessages)  
chatRouter.get("/chats",verifyUser,getUserChats)  



   
export default chatRouter