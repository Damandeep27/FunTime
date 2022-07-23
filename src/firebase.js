import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
  } from "firebase/firestore";
  const firebaseConfig = {
    apiKey: "AIzaSyDQanKxhFCXYC75bImRTaBQdceYF9gSL_M",
    authDomain: "fun--time.firebaseapp.com",
    projectId: "fun--time",
    storageBucket: "fun--time.appspot.com",
    messagingSenderId: "370024831667",
    appId: "1:370024831667:web:832ae337e0786222ff2ec6",
    measurementId: "G-Q7MBRC75TG"
  };
  
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const googleProvider = new GoogleAuthProvider();
  
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const user = res.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        await addDoc(collection(db, "users"), {
          uid: user.uid,
          name: user.displayName,
          authProvider: "google",
          email: user.email,
        });
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  
  const logout = () => {
    signOut(auth);
    
        
  };
  export {
    auth,
    db,
    signInWithGoogle,
    logout,
  };