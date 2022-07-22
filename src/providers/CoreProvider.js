import React, { useState, useContext, createContext, useRef } from 'react'

export const CoreContext = createContext({})
export const useCore = () => useContext(CoreContext)

export const CoreProvider = ({ children }) => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const canvasRef = useRef();
    const ctxRef = useRef();

    const controllers = {
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