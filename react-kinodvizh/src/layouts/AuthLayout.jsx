import { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";
import Error404 from "../pages/Error404";

function AuthLayout()
{
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) navigate('login')
    })

    return <Outlet/>;
}

export default AuthLayout;