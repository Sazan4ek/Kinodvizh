import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";
import { useEffect } from "react";
import Spinner from "../components/Spinner/Spinner";

function AdminLayout()
{
    const { user, userLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!userLoading && user?.role?.name !== 'admin') navigate('/');
    }, [userLoading, user]);

    // if(userLoading || user?.role?.name !== 'admin') return <Spinner />

    return <Outlet/>;
}

export default AdminLayout;