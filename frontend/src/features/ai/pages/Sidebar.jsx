import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { userChat } from "../hooks/ai.hook"
import './Sidebar.css'

const Sidebar = () => {
    const navigate = useNavigate()
    const { getUserChats, allChats } = userChat()

    useEffect(() => {
        getUserChats()
    }, [])

    return (
        <div className="sidebar-root">
            <button 
                onClick={() => navigate('/')} 
                className="sidebar-newchat-btn"
            >
                + New Chat
            </button>
            <div className="sidebar-chats-list">
                {allChats.map((chat) => (
                    <div 
                        key={chat._id} 
                        onClick={() => navigate(`/chat/${chat._id}`)}
                        className="sidebar-chat-item"
                    >
                        {chat.title || "New Conversation"}
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Sidebar