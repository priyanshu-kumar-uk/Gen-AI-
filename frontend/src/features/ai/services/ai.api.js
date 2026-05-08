// When we are using a SSE so we cant use axios because of that axios cant support of SSR
// so  we have used a  Fetch methode , 

export async function sendMessage(userMessage,onChunk = (chunk)=>{}) {
    const res = await fetch("http://localhost:4000/api/chat", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({ message: userMessage })
    })

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
}


