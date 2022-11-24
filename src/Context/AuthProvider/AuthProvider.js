import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, { createContext, useEffect, useState } from 'react'
import app from '../../firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

export default function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

    // create user with email and pass
    const createUser = (email, pass) => {
        return createUserWithEmailAndPassword(auth, email, pass);
    }
    // sign in with email and pass
    const signIn = (email, pass) => {
        return signInWithEmailAndPassword(email, pass);
    }
    // update user profile
    const updateUser = (userInfo) => {
        return updateProfile(auth.currentUser, userInfo);
    }
    // const sign in with provider (google,facebook,gihub etc...)
    const providerLogin = (provider) => {
        return signInWithPopup(auth, provider);
    }
    // log out
    const logOut = () => {
        return signOut(auth);
    }

    // set onAuthStateChanged observer
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser || currentUser === null) {
                setUser(currentUser);
                setLoading(false);
            }
        })

        return () => unsubscribe();
    }, [])

    const authInfo = { user, loading, createUser, signIn, providerLogin, updateUser, logOut };
    return (
        <div>
            <AuthContext.Provider value={authInfo
            }>
                {children}
            </AuthContext.Provider>
        </div>
    )
}
