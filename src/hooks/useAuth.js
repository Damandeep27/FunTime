import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useUser } from 'providers/UserProvider'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, useFirebase } from 'hooks/useFirebase'

export const useAuth = ({ protect }) => {
    const toast = useToast();
    const { userData } = useUser();
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const { GetUserData } = useFirebase();

    // ReAuthenticate
    useEffect(() => {
        if (loading) return;

        if (error) {
            toast({
                title: 'Error',
                description: error.message || 'Something wrong occured',
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: 'bottom-center'
            })
            return;
        }

        if (user && !userData) GetUserData(user);

        if (!user && protect) {
            navigate('/');
            return;
        }
        
        if (userData && !protect) navigate('/game');

    }, [user, error, loading, userData])
}