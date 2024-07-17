import { useContext } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";


function GuestLayout()
{
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    return user ? navigate('/') : <Outlet/>;
}

export default GuestLayout;