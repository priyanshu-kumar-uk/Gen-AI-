import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchChat, fetchMessage, sendMessage } from '../services/ai.api.js'
import { addMessage, appendContentToLastMessage, setActiveChatId, setAllChats, setMessages } from '../state/ai.state.js'

export const userChat = function () {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const activeChatId = useSelector(state => state.chat.activeChatId)
    const allChats = useSelector(state => state.chat.allChats)

    const userMessageSend = async (userMessage) => {
        dispatch(addMessage({ role: "user", content: userMessage }))
        dispatch(addMessage({ role: "assistant", content: "" }))

        const serverChatId = await sendMessage(userMessage, activeChatId, ({ chunk }) => {
            dispatch(appendContentToLastMessage({ chunk }))
        })

        // Agar new chat thi (activeChatId null tha), toh redirect aur sidebar refresh
        if (serverChatId && serverChatId !== activeChatId) {
            dispatch(setActiveChatId(serverChatId));
            getUserChats(); // Sidebar update karo naye title ke liye
            navigate(`/chat/${serverChatId}`);
        }
    }

    const userHistory = async (id) => {
        const data = await fetchMessage({ chatId: id })
        if (data) {
            dispatch(setMessages(data));
        }
    }

    const getUserChats = async () => {
        const data = await fetchChat()
        if (data) {
            dispatch(setAllChats(data))
        }
    }

    return { userMessageSend, userHistory, getUserChats, allChats }
}