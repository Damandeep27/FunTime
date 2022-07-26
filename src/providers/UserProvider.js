import React, { useState, useContext, createContext } from 'react'

export const UserContext = createContext({})
export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [userData, setUserData] = useState();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const controllers = {
        user,
        setUser,
        userData,
        setUserData,
        isLoggedIn,
        setIsLoggedIn
    }

    return (
		<UserContext.Provider
			value={controllers}
		>
			{ children }
		</UserContext.Provider>
	)
}