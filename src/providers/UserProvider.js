import React, { useState, useContext, createContext } from 'react'
import uniqid from 'uniqid'

export const UserContext = createContext({})
export const useUser = () => useContext(UserContext)

const playerId = uniqid();

export const UserProvider = ({ children }) => {

    const controllers = {
        playerId
    }

    return (
		<UserContext.Provider
			value={controllers}
		>
			{ children }
		</UserContext.Provider>
	)
}