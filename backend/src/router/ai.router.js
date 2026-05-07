import {Router} from 'express'
import {handleMessage} from '../controller/ai.controller.js'

const chatRouter = Router()

chatRouter.post("/chat",handleMessage)   
   
export default chatRouter