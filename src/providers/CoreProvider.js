import React, { useState, useContext, createContext } from 'react'

export const CoreContext = createContext({})
export const useCore = () => useContext(CoreContext)

export const CoreProvider = ({ children }) => {
    const [messages, setMessage] = useState([]);
    const [messageInput, setMessageInput] = useState('');

    const controllers = {
        messages,
        setMessage,
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