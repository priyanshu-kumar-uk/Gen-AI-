import {Router} from 'express'
import {chatMessage} from '../controller/ai.controller.js'

const chatRouter = Router()

chatRouter.post("/chat",chatMessage)

export default chatRouter