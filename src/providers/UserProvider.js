import React, { useState, useContext, createContext } from 'react'

export const UserContext = createContext({})
export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {

    const controllers = {
        
    }

    return (
		<UserContext.Provider
			value={controllers}
		>
			{ children }
		</UserContext.Provider>
	)
}