import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";

function AdminLayout()
{
    const { user, userLoading } = useAuth();
    const navigate = useNavigate();

    if(!userLoading && user?.role?.name !== 'admin') navigate('/');

    return <Outlet/>;
}

export default AdminLayout;