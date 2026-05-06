import {getResponse} from '../services/ai.service.js'

const message = []                 // memory of stored a data becuse Ai dont rembers previos chat they dont have any history of our chat that why we are using a local memory 
export async function chatMessage(req,res){
   const userChat = req.body.message               // user gives aq prompt 

   message.push({                                     // first i did a store user message 
    role:"user",
    content:userChat
   })

   const content = await getResponse(message)     // here user message goes to ai 

     message.push({            // this is a ai response we ar storing into message memory
        role:"Ai",
        content:content
     })

   res.json(
    {
        content,
        message
    }
)                              // here i print that response of  ai 
}