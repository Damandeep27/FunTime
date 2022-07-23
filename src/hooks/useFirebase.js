import { initializeApp } from 'firebase/app'
import { useToast } from '@chakra-ui/react'
import { useUser } from 'providers/UserProvider'
import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from 'firebase/auth'

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
    const { setUser } = useUser();

    const SignInWithGoogle = async () => {
        try {
            const res = await signInWithPopup(auth, googleProvider);
            const user = res.user;
            setUser(user);
          
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

    const Logout = () => {
        try {
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

    return {
        SignInWithGoogle,
        Logout,
    }
}