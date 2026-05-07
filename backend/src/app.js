import express from 'express'
import chatRouter from './router/ai.router.js'

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }));


app.use("/",chatRouter)

export default app