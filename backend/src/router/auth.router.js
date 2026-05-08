import {Router} from 'express'
import {getMe, register} from '../controller/auth.controller.js'
import { verifyUser } from '../middleware/verifyUser.js'


const authRouter = Router()

authRouter.post("/register",register)
authRouter.get("/getMe",verifyUser,getMe)


export default authRouter