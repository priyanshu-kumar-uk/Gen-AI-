import express from 'express'
import chatRouter from './router/ai.router.js'
import authRouter from './router/auth.router.js'
import cookie from 'cookie-parser'
import cors from 'cors'

const app = express()
app.use(cors({
    origin:"http://localhost:5173   ",
    credentials: true
}))
app.use(express.json())
app.use(cookie())
app.use(express.urlencoded({ extended: false }));

app.use("/api",chatRouter)
app.use("/api/auth",authRouter)
export default app

// streming ,chatsave, chatshow 