import { initializeApp } from 'firebase/app'
import { useToast } from '@chakra-ui/react'
import { useUser } from 'providers/UserProvider'
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import config from 'config/index'

const firebaseConfig = {
    apiKey: process.env.FB_API_KEY,
    authDomain: process.env.FB_AUTH_DOMAIN,
    projectId: process.env.FB_PROJECT_ID,
    storageBucket: process.env.FB_STORAGE_BUCKET,
    messagingSenderId: process.env.FB_SENDER_ID,
    appId: process.env.FB_APP_ID,
    measurementId: process.env.FB_MEASUREMENT_ID
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
  
export const useFirebase = () => {
    const toast = useToast();
    const navigate = useNavigate();
    const { setUser, setUserData, setIsLoggedIn } = useUser();

    /**
     * Sign in with google oauth
     */
    const SignInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            
            localStorage.setItem('funtime-token', res._tokenResponse.oauthIdToken);

            setUser(res.user);

            const { uid, email, displayName } = res.user;

            const res2 = await axios.post(`${config.serverUrl}/api/v1/user/login`, {
                firebase_uid: uid,
                email,
                name: displayName
            }, {
                headers: { 
                    Authorization: `Bearer ${res._tokenResponse.oauthIdToken}` 
                }
            })

            setUserData(res2.data);

            setIsLoggedIn(true);
          
        } catch (err) {
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
     * Logout user from website
     */
    const Logout = () => {
        try {
            localStorage.removeItem('funtime-token');
            setUser(null);
            setUserData(null);
            signOut(auth);
            navigate('/');
        } catch (err) {
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
     * Get user data from mongodb
     * @param {*} user user data from oauth 
     * @param {*} accessToken accessToken from oauth
     * @returns userData from mongodb as json
     */
    const GetUserData = async (user) => {
        try {
            const { email } = user;

            const accessToken = localStorage.getItem('funtime-token');

            if (!accessToken) throw new Error('Please re-login to Funtime');

            setUser(user);

            const res = await axios.get(`${config.serverUrl}/api/v1/user/getByEmail`, {
                params: {
                    email
                },
                headers: { 
                    Authorization: `Bearer ${accessToken}` 
                }
            })

            if (res.status !== 200) return null;

            setUserData(res.data);

            return res.data;

        } catch (err) {
            console.error(err);
            return null;
        }
    }

    return {
        SignInWithGoogle,
        Logout,
        GetUserData
    }
}