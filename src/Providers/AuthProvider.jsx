import { createContext, useEffect, useState } from "react";
import imgLogo from '../assets/images/logo/logo.png'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import {app} from '../firebase/firebase.config'

// Auth Context
export const AuthContext = createContext(null);
const auth = getAuth(app);
// Inline Spinner Styles
const spinnerStyles = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999
};

const spinnerImageStyles = {
    width: "250px",
    height: "250px",
    animation: "spin 1s infinite linear"
};

// Auth provider
const AuthProvider = ({children}) => {
    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    

    // create user
    const createUser = (email, password) =>{
        // setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)
    };

    // sign in 
    const signIn = ( email, password) =>{
        // setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // google sign in
    const googleSignIn = () =>{
        // setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // log Out
    const logOut = () =>{
        // setLoading(true);
        return signOut(auth);
    }

    // update user profile
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    };



    // unsubscribe
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser =>{
            setUser(currentUser);
            console.log('current user', currentUser);
            setLoading(false);
        })
        return () =>{
            return unsubscribe();
        }
    }, []);

    // Auth info
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleSignIn
    }
    return (
        <AuthContext.Provider value={authInfo}>
        {loading ? (
            <div style={spinnerStyles}>
                <img 
                    src={imgLogo} 
                    alt="loading" 
                    style={spinnerImageStyles}
                />
                <h2 className="text-2xl text-teal-900 text-center">Loading.......</h2>
            </div>
        ) : (
            children
        )}
        {/* {children} */}
    </AuthContext.Provider>
    );
};

export default AuthProvider;