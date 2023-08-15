/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import app from "../../firebase/firebase.config";


//Create Context 
export const AuthContext = createContext(null);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // Create User
const createUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
}

// Login User
const loginUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
}

// observe auth state
useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser =>{
        setUser(currentUser);
        setLoading(false);
    });
    return () =>{
        unsubscribe();
    }
}, []);

// Log Out
const logOut = () => {
    return signOut(auth);
}

// Google sign in
const googleSignIn = () => {
    return signInWithPopup(auth, googleAuthProvider);
}


const authInfo = {
    user,
    loading,
    createUser,
    loginUser,
    googleSignIn,
    logOut
}
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;