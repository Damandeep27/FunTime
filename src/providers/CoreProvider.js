import React, { useState, useContext, createContext } from 'react'
import { io } from 'socket.io-client'
const socket = io();

export const CoreContext = createContext({})
export const useCore = () => useContext(CoreContext)

export const CoreProvider = ({ children }) => {
    const [messages, setMessage] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    const controllers = {
        messages,
        setMessage,
        messageInput,
        setMessageInput,
        socket
    }

    return (
		<CoreContext.Provider
			value={controllers}
		>
			{ children }
		</CoreContext.Provider>
	)
}