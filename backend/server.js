import app from './src/app.js'
import config from './src/config/config.js'
import dbConnect from './src/config/database.js'

dbConnect()

app.listen(config.PORT,()=>{
    console.log("Server run on port number",config.PORT)
})

// userSchema
// Chatschema
// messageSchema
// First user chat should be title