import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { userChat } from '../hooks/ai.hook.js'
import { setMessages, setActiveChatId } from '../state/ai.state.js'
import './Chat.css'

const Chat = () => {
    const { id } = useParams()
    const dispatch = useDispatch()
    const { register, handleSubmit, reset } = useForm()
    const { userMessageSend, userHistory } = userChat()
    const messages = useSelector(state => state.chat.messages)

    useEffect(() => {
        if (id) {
            dispatch(setActiveChatId(id))
            userHistory(id)
        } else {
            dispatch(setMessages([]))
            dispatch(setActiveChatId(null))
        }
    }, [id]) 

    function handleUserInput(data) {
        userMessageSend(data.userMessage)
        reset()
    }

    return (
        <div className="chat-root">
            <div className="chat-messages">
                {messages.length === 0 && !id && (
                    <h1 className="chat-empty">How can I help you today?</h1>
                )}
                {messages.map((msg, index) => (
                    <div 
                        key={index} 
                        className={`chat-message-row ${msg.role === "user" ? "user" : "assistant"}`}
                    >
                        <span className={`chat-message-label ${msg.role}`}>{msg.role === 'user' ? 'You' : 'Ai'}</span>
                        <span className="chat-message-content">{msg.content}</span>
                    </div>
                ))}
            </div>

            <div className="chat-input-panel">
                <form onSubmit={handleSubmit(handleUserInput)} className="chat-input-form">
                    <input  
                        type='text'
                        className="chat-input"
                        placeholder="Message AI..." 
                        {...register("userMessage", { required: true })}
                        autoComplete="off"
                    />
                    <button type="submit" className="chat-send-btn" aria-label="Send">
                        <svg className="send-icon" viewBox="0 0 24 24">
                            <path d="M3 20v-2l14-5-14-5V6l18 7-18 7z" />
                        </svg>
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Chat