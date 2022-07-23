import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from 'utils/firebase.js'

export const useAuth = ({ protect }) => {
    const toast = useToast();
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

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

        console.log(user)

        if (protect && !user) navigate('/');
        else if (!protect && user) navigate('/game');
    }, [user, loading]);
}