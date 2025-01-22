import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { AuthContext } from "../Providers/AuthProvider";

const useAdmin = () => {
    const {user} = useContext(AuthContext);
    // const axiosSecure = useAxiosSecure();
    const {data : role, isLoading: isAdminLoading} = useQuery({
        queryKey : [user?.email, 'users'],
        queryFn : async() =>{
            const res = await axios.get(`http://localhost:5000/users/${user?.email}`);
            console.log(res);
            return res.data?.role;
        }
    })
    // console.log(res?.data?.role)
    return [role, isAdminLoading]
};

export default useAdmin;