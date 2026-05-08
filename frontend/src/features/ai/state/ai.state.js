import { createSlice } from '@reduxjs/toolkit'

const aiSlice = createSlice({
    name: "chat",
    initialState: {
        messages: [],
        activeChatId: null,
        allChats: [],
    },
    reducers: {
        setActiveChatId: (state, action) => {
            state.activeChatId = action.payload;
        },
        setAllChats: (state, action) => {
            state.allChats = action.payload;
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },

        addMessage: (state, action) => {
            console.log(action.payload)       // user message 
            state.messages.push(action.payload)
        },
        appendContentToLastMessage: (state, action) => {
            console.log(action.payload)            // ai response 
            const lastmessage = state.messages[state.messages.length - 1]

            if (lastmessage) {
                lastmessage.content += action.payload.chunk
            }

        }
    }
})

export const { addMessage, appendContentToLastMessage, setActiveChatId, setMessages, setAllChats } = aiSlice.actions

export default aiSlice.reducer