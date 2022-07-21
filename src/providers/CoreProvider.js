import React, { useState, useContext, createContext, useRef } from 'react'
import { io } from 'socket.io-client'
const socket = io();

export const CoreContext = createContext({})
export const useCore = () => useContext(CoreContext)

export const CoreProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const canvasRef = useRef();

    const controllers = {
        socket,
        messages,
        setMessages,
        messageInput,
        setMessageInput,
        canvasRef
    }

    return (
		<CoreContext.Provider
			value={controllers}
		>
			{ children }
		</CoreContext.Provider>
	)
}