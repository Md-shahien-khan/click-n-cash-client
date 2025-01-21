import { AuthContext } from "../Providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import { Navigate, useLocation } from "react-router-dom";
import { useContext } from "react";

const AdminRoute = () => {
    const [user, loading] = useContext(AuthContext);
    const [isAdmin, isAdminLoading] = useAdmin();
    // const location = useLocation();

    if(loading || isAdminLoading){
        return <progress className="progress w-56"></progress>
    }
    if(user && isAdmin){
        return children;
    }
    return <Navigate to='/login'></Navigate>
};

export default AdminRoute;