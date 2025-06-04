import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";
import Spinner from "../components/Spinner/Spinner";
import { useEffect } from "react";

function AuthLayout()
{
    const { user, userLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(!userLoading && !user) navigate('login');
    }, [userLoading, user]);

    // if(userLoading || !user) return <Spinner />;

    return <Outlet/>;
}

export default AuthLayout;