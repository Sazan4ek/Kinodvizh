import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";


function AdminLayout()
{
    const { userRole } = useContext(AuthContext);

    return userRole === 'admin' ? <Outlet/> : <Navigate to={'/'}/>;
}

export default AdminLayout;