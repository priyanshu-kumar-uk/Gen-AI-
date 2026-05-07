import {ChatMistralAI} from '@langchain/mistralai'
import config from '../config/config.js'

const model  =  new ChatMistralAI({        // s-1 this model 
    model: "mistral-medium-latest",
    apiKey: config.MISTRAL_API_KEY
})

export async function getResponse(message){          // s-4  actual response goes export
   let response = await model.invoke(message)   // s-2 call kiya jo message user kiya bo yha paas kar diya 
   return response.content                       // s-3 return a response from ai 
}

