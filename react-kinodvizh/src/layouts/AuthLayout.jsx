import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";

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