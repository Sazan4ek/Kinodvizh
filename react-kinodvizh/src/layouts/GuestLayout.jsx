import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";
import { useEffect } from "react";
import Spinner from "../components/Spinner/Spinner"

function GuestLayout()
{
    const { user, userLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!userLoading && user) navigate('/');
    }, [userLoading, user]);

    // if(userLoading || user) return <Spinner />;
    
    return <Outlet/>;
}

export default GuestLayout;