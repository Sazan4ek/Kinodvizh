import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";


function GuestLayout()
{
    const { user } = useContext(AuthContext);

    return user ? <Navigate to={'/'}/> : <Outlet/>;
}

export default GuestLayout;