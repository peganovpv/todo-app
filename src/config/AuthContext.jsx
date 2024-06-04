import { createContext, useContext, useEffect, useState } from "react";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';

import { auth } from './firebase';

const AuthContext = createContext();

export const useAuth = () =>{
    const Context = useContext(AuthContext)
    return Context;
}


export const AuthProvider = ( {children} ) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true)
    
    const signUp = (email, password) => createUserWithEmailAndPassword(auth,email,password);
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password);
    const logOut = () => signOut(auth);

    const googleLogin = () => {
        const googleProvider = new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    }

    const forgotPassword = async(email) => sendPasswordResetEmail(auth,email);
    
    useEffect(() => {
        const unsubuscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        });
        return () => unsubuscribe();
      }, []);


    return (
        <AuthContext.Provider value = {{signUp, login, googleLogin, logOut, forgotPassword, user, loading}}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthProvider;