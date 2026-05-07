import {getStream} from '../services/ai.service.js'

// const message = []                 // memory of stored a data becuse Ai dont rembers previos chat they dont have any history of our chat that why we are using a local memory 
// export async function chatMessage(req,res){
//    const userChat = req.body.message               // user gives a p++rompt 

//    message.push({                                     // first i did a store user message 
//     role:"user",
//     content:userChat
//    })

//    const content = await getResponse(message)     // here user message goes to ai 

//      message.push({            // this is a ai response we ar storing into message memory
//         role:"Ai",
//         content:content
//      })

//    res.json(
//     {
//         content,
//         message
//     }
// )                              // here i print that response of  ai 
// }   // invoke


export async function handleMessage(req, res) {

    console.log(req.body)
    const message = req.body.message

    const messages = [
        {
            role: "user",
            content: message
        }
    ]

    const stream = await getStream(messages)

    res.setHeader("Content-Type", "text/event-stream")
    res.setHeader("Cache-Control", "no-cache")
    res.setHeader("Connection", "keep-alive")

    for await (const chunk of stream) {

        const aiChunk = chunk[ 0 ].content

        res.write(`data: ${JSON.stringify({ chunk: aiChunk })}\n\n`)
    }

    res.end()

    console.log(messages)
}  // stream



// Create agent
// Stream using Docs from create by Ai  
// Data send on server used a SSE

// Axios does not support SSE / so we are useing a fetch mathode docs