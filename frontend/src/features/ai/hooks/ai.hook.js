import {useDispatch} from 'react-redux'
import {sendMessage} from '../services/ai.api.js'
import {addMessage,appendContentToLastMessage} from '../state/ai.state.js'

export const userChat = function(){
    const dispatch = useDispatch()

    const userMessageSend = async(userMessage)=>{
       dispatch(addMessage({
          role:"user",
          content: userMessage 
       }))
    
       dispatch(addMessage({
        role:"ai",
        content:""                                // here ai message fill 
       }))

        sendMessage(userMessage,({chunk})=>{
            dispatch(appendContentToLastMessage({chunk}))
        })
    }

    return {
        userMessageSend
    }

}