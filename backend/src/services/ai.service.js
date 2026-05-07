import { ChatMistralAI } from '@langchain/mistralai'
import config from '../config/config.js'
import { createAgent } from "langchain"

const model = new ChatMistralAI({        // s-1 this model 
    model: "mistral-medium-latest",
    apiKey: config.MISTRAL_API_KEY
})

const agent = createAgent({
    model,
    tools: []
})

//  export async function getResponse(messages) {   //Invoke       // s-4  actual response goes export
//     let response = await model.invoke(messages)   // s-2 call kiya jo message user kiya bo yha paas kar diya 
//     return response.content                       // s-3 return a response from ai 
// }

export async function getStream(messages) {    // stream
    const stream = await agent.stream({ messages }, { streamMode: "messages" })
    return stream
}
