import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
    const {googleSignIn} = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();

    const handleGoogleSignIn = () =>{
        googleSignIn()
            .then(result =>{
                console.log(result.user);
                const userInfo = {
                    email : result.user?.email,
                    name : result.user?.displayName,
                    photoURL : result.user?.photoURL,
                    role: 'worker',
                    coins: 10      
                }
                axiosPublic.post('/users', userInfo)
                    .then(res =>{
                        console.log(res.data);
                        navigate('/');
                    })
            })
    }
    return (
        <div className="my-2">
            <div>
                <button onClick={handleGoogleSignIn} className="btn bg-teal-500 text-white">
                    <FaGoogle className="text-blue-700"></FaGoogle> Login with Google
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;