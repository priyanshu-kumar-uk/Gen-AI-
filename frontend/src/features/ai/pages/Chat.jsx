import React from 'react'
import {userChat} from '../hooks/ai.hook.js'
import {useForm} from 'react-hook-form'
import { useSelector } from 'react-redux'
const Chat = () => {

 let{register,handleSubmit,reset} =  useForm() 
 let{userMessageSend} = userChat()

 const message = useSelector(state=> state.chat.messages)

 function handleUserInput(data){
  userMessageSend(data.userMessage)
  reset()
 }
  return (
    <div>
        <form  onSubmit={handleSubmit(handleUserInput)}>
          <input  
          type='text'
           placeholder="write here a message" 
           {...register("userMessage",{required:true})}
           />
          <button>Send</button>
        </form>
       {
          message.map((message,index)=>{
           return  <div key={index} style={{ textAlign: message.role === "user" ? "right" : "left" }}>
                 <p>{message.content}</p>
             </div>
          })
       }
    </div>
  )
}

export default Chat