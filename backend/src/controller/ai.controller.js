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
import chatModel from '../models/chat.model.js'
import messageModel from '../models/message.model.js'

export async function handleMessage(req, res) {
    const { message, chatId } = req.body;
    const userId = req.user.id;

    let currentChatId = (chatId && typeof chatId === 'string') ? chatId : null;

    try {
        if (!currentChatId) {
            const newChat = await chatModel.create({
                userId: userId,
                title: message.substring(0, 35) + "..."
            });
            currentChatId = newChat._id; 
        }

        await messageModel.create({
            chatId: currentChatId, 
            role: "user",
            content: message
        });

        const history = await messageModel.find({ chatId: currentChatId }).sort({ createdAt: 1 });
        const aiMessages = history.map(msg => ({ 
            role: msg.role, 
            content: msg.content 
        }));
        
        const stream = await getStream(aiMessages);

        res.setHeader("Content-Type", "text/event-stream");
        res.setHeader("Cache-Control", "no-cache");
        res.setHeader("Connection", "keep-alive");
        res.setHeader("Access-Control-Expose-Headers", "x-chat-id"); 
        res.setHeader("x-chat-id", currentChatId.toString());

        let fullAIResponse = "";

        for await (const chunk of stream) {
            const aiChunk = chunk[0]?.content||"" 
            if (aiChunk) {
                fullAIResponse += aiChunk;
                res.write(`data: ${JSON.stringify({ chunk: aiChunk })}\n\n`);
            }
        }
         console.log("Saving AI Response:", fullAIResponse);
        await messageModel.create({
            chatId: currentChatId,
            role: "assistant", 
            content: fullAIResponse
        });

        res.end();

    } catch (error) {
        console.error("Controller Error:", error);
        if (!res.writableEnded) {
            res.status(500).end();
        }
    }
}  // stream


export const getChatMessages = async (req, res) => {
    try {
        const { chatId } = req.params; 
        
        const messages = await messageModel.find({ chatId }).sort({ createdAt: 1 });
        
        if (!messages) {
            return res.status(404).json({ message: "Message not found" });
        }

        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: "message fetched successfully" });
    }
};

export const getUserChats = async (req, res) => {
    try {
        const userId = req.user.id;
        
        const chats = await chatModel.find({ userId }).sort({ createdAt: -1 });
        
        res.status(200).json(chats);
    } catch (error) {
        res.status(500).json({ message: "Chats fetch karne mein error aayi" });
    }
};



// Create agent
// Stream using Docs from create by Ai  
// Data send on server used a SSE

// Axios does not support SSE / so we are useing a fetch mathode docs