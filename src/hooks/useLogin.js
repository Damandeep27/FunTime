import { useState, useEffect, useRef } from 'react'
import { useToast } from '@chakra-ui/react'
import { useCore } from 'providers/CoreProvider'
import { useUser } from 'providers/UserProvider'
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    GoogleAuthProvider,
    getAuth,
    signInWithPopup,
    signOut,
  } from "firebase/auth";
  
import { auth,
    db,
    signInWithGoogle,
    logInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordReset,
    logout,} from "../firebase.js"

export const useLogin= () => {


 const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) {  
      return ;
    }
    
    if (user) navigate("/game");
   
  }, [user, loading]);


}