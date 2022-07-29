import { useState, useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useUser } from 'providers/UserProvider'
import { useFirebase } from 'hooks/useFirebase'
import axios from 'axios'

export const useProfile = () => {
    const toast = useToast();
    const { userData, setUserData, setUser } = useUser();
    const [name, setName] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const { Logout } = useFirebase();

    useEffect(() => {
        if (!userData) return;

        const { name } = userData;

        setName(name);

    }, [userData]);

    /**
     * Set user's name
     */
    const SaveName = async () => {
        try {
            setIsSaving(true);

            const accessToken = localStorage.getItem('funtime-token');

            if (!accessToken) throw new Error('Please re-login to Funtime');

            const nameInput = name.trim();

            if (nameInput.length > 25) throw new Error('Maximum length of name is 25 characters');

            const res = await axios.patch(`https://fun--time.herokuapp.com/api/v1/user/setName`, {
                userId: userData._id,
                name: nameInput
            }, {
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            if (res.status !== 200) return;

            let newUserData = {...userData};
            newUserData.name = nameInput;

            setUserData(newUserData);
            setIsSaving(false);

            toast({
                title: 'Success',
                description: "Successfully changed player's name",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
        catch (err) {
            setIsSaving(false);
            console.error(err);
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
    }

    /**
     * Delete user from website
     */
    const Delete = async () => {
        try {
            const accessToken = localStorage.getItem('funtime-token');

            if (!accessToken) throw new Error('Please re-login to Funtime');

            const res = await axios.delete(`${config.serverUrl}/api/v1/user/delete`, {
                data: {
                    userId: userData._id
                },
                headers: {
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            if (res.status !== 200) return;

            Logout();

            toast({
                title: 'Success',
                description: 'Successfully deleted your account',
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
        catch (err) {
            console.error(err);
            toast({
                title: 'Error',
                description: err.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
        }
    }

    return {
        SaveName,
        Delete,
        name,
        setName,
        isSaving
    }
}