import React, { createContext, useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
    updateProfile
} from "firebase/auth";
import app from '../Firebase/Firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);


const Authprovider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // signIn with google 
    const googleProvider = new GoogleAuthProvider();
    const googleSignin = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // create user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }
    // login
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }
    // logout
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    };
    //Update user 
    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser,userInfo)
    }
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log("user observe");
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            return unsubscribe();
        }
    },[])

    const authInfo = {
        createUser,
        signIn,
        logOut,
        user,
        updateUser,
        loading,
        googleSignin,
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default Authprovider;