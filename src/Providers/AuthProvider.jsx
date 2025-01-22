import { createContext, useEffect, useState } from "react";
import imgLogo from '../assets/images/logo/logo.png'
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import {app} from '../firebase/firebase.config'
import useAxiosPublic from "../hooks/useAxiosPublic";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";


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
    // const [coins, setCoins] = useState(0);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    // // Query to fetch user's coins
    // const { data, refetch } = useQuery({
    //     queryKey: ['users', user?.email],
    //     queryFn: async () => {
    //         try {
    //             // API call to get user data
    //             const res = await axiosPublic.get(`http://localhost:5000/users/${user?.email}`);
    //             console.log('API response:', res); // Log the full API response

    //             // Check if the structure is as expected
    //             if (res.data && res.data.user && res.data.user.coins !== undefined) {
    //                 // If valid, set coins state and return coins
    //                 setCoins(res.data.user.coins);
    //                 return res.data.user.coins;
    //             } else {
    //                 throw new Error('Coins not found in response');
    //             }
    //         } catch (error) {
    //             // If error occurs, log and return a default value
    //             console.error('API request failed:', error);
    //             return 0; // Return a default value
    //         }
    //     },
    //     enabled: !!user?.email, // Ensure query only runs when there's a valid user email
    // });

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
            
            if(currentUser){
                // get token and store client
                // const userInfo = {email: currentUser.email};
                // axiosPublic.post(userInfo)
                //     .then(res =>{
                //         if(res.data.token){
                //             localStorage.setItem('access-token', res.data.token)
                //         }
                //     })
                setUser(currentUser);
            setLoading(false);
            }
            else{
                // todo remove token(if token stored in the client side)
                // localStorage.removeItem('access-token');
                setUser(currentUser);
                setLoading(false);
            }
        })
        return () =>{
            return unsubscribe();
        }
    }, [axiosPublic]);

    // role

    // Auth info
    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile,
        googleSignIn,
        // coins
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