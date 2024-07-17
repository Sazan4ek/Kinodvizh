import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";

function AdminLayout()
{
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    return user?.role?.name === 'admin' ? <Outlet/> : navigate('/');
}

export default AdminLayout;