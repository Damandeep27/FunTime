import { useEffect } from 'react'
import { useToast } from '@chakra-ui/react'
import { useUser } from 'providers/UserProvider'
import { useNavigate } from 'react-router-dom'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth, useFirebase } from 'hooks/useFirebase'

export const useAuth = ({ protect }) => {
    const toast = useToast();
    const { setUser, setUserData } = useUser();
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();
    const { GetUserData } = useFirebase();

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

        if (user) configureUser(user);

        if (protect && !user) navigate('/');
        else if (!protect && user) navigate('/game');
    }, [user, loading]);

    /**
     * set userData state by getting it from mongodb
     * @param {*} user user data from oauth
     */
    const configureUser = async (user) => {
        try {
            setUser(user);

            const accessToken = localStorage.getItem('funtime-token');

            if (!accessToken) throw new Error('Please re-login to Funtime');

            const resUserData = await GetUserData(user, accessToken);

            setUserData(resUserData);
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
}