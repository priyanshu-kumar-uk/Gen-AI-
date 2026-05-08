// When we are using a SSE so we cant use axios because of that axios cant support of SSR
// so  we have used a  Fetch methode , 
import axios from 'axios'
export async function sendMessage(userMessage,chatId = null,onChunk = (chunk)=>{}) {
    const res = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
             message: userMessage,
             chatId:chatId 
            })
    })
    const serverChatId = res.headers.get("x-chat-id");

    const decoder = new TextDecoder()
    for await (const chunk of res.body) {
        const text = decoder.decode(chunk);
        const lines = text.split("\n\n")    
        for(const line of lines){
            if(line.startsWith("data: ")){
                const jsonStr = line.replace("data: ","")
                const data = JSON.parse(jsonStr)
                onChunk(data)
            }
        }
    }

    return serverChatId
}

export async function  fetchMessage({chatId}) {
 let res = await axios.get(`http://localhost:4000/api/chat/${chatId}`,{withCredentials:true})
 return res.data
}


export async function  fetchChat() {
 let res = await axios.get("http://localhost:4000/api/chats",{withCredentials:true})
 return res.data
}



