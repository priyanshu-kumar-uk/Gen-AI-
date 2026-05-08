import {createSlice} from '@reduxjs/toolkit'

const aiSlice =  createSlice({
    name:"chat",
    initialState:{
      messages:[]
    },
    reducers:{
        addMessage:(state, action)=>{
            console.log(action.payload)       // user message 
            state.messages.push(action.payload) 
        },
        appendContentToLastMessage:(state,action)=>{
            console.log(action.payload)            // ai response 
          const lastmessage = state.messages[state.messages.length-1]

          if(lastmessage){
              lastmessage.content += action.payload.chunk  
          }

        }
    }
})

export const {addMessage,appendContentToLastMessage} = aiSlice.actions

export default aiSlice.reducer