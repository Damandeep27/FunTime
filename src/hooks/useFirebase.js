import { initializeApp } from 'firebase/app'
import { useToast } from '@chakra-ui/react'
import { useUser } from 'providers/UserProvider'
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'
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
    const { setUser, setUserData } = useUser();

    /**
     * Sign in with google oauth
     */
    const SignInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            
            setUser(res.user);

            localStorage.setItem('funtime-token', res._tokenResponse.oauthIdToken);

            const resUserData = await GetUserData(res.user, res._tokenResponse.oauthIdToken);

            setUserData(resUserData);
          
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
    const GetUserData = async (user, accessToken) => {
        try {
            const { uid, email, displayName } = user;

            setUser(user);

            const res = await axios.post(`${config.serverUrl}/api/v1/user/login`, {
                firebase_uid: uid,
                email,
                name: displayName
            }, {
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