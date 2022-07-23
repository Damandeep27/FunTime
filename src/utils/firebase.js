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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
  
const signInWithGoogle = async () => {
    const toast = useToast();
    const { setUser } = useUser();
    
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
  
const logout = () => {
    signOut(auth);     
}

export {
    auth,
    signInWithGoogle,
    logout,
}