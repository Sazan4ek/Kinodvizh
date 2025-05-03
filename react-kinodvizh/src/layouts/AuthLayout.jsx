import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";

function AuthLayout()
{
    const { user, userLoading } = useAuth();
    const navigate = useNavigate();

    if(!userLoading && !user) navigate('login')

    return <Outlet/>;
}

export default AuthLayout;