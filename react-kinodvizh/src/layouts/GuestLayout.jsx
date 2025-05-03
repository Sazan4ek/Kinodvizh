import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContextProvider";

function GuestLayout()
{
    const { user, userLoading } = useAuth();
    const navigate = useNavigate();
    
    if(!userLoading && user) navigate('/');
    
    return <Outlet/>;
}

export default GuestLayout;