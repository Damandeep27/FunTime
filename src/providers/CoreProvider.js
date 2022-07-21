import React, { useState, useContext, createContext, useRef } from 'react'
import { io } from 'socket.io-client'
import config from 'config/index'
const socket = io();

export const CoreContext = createContext({})
export const useCore = () => useContext(CoreContext)

export const CoreProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const canvasRef = useRef();
    const ctxRef = useRef();

    const controllers = {
        socket,
        canvasRef,
        ctxRef,
        messages,
        setMessages,
        messageInput,
        setMessageInput
    }

    return (
		<CoreContext.Provider
			value={controllers}
		>
			{ children }
		</CoreContext.Provider>
	)
}