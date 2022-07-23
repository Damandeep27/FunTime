import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useUser } from 'providers/UserProvider'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from 'hooks/useFirebase'

export const useAuth = ({ protect }) => {
    const toast = useToast();
    const { setUser } = useUser();
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

        if (user) setUser(user);

        if (protect && !user) navigate('/');
        else if (!protect && user) navigate('/game');
    }, [user, loading]);
}