import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";


function GuestLayout()
{
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(user) navigate(-1);
    })
    
    return <Outlet/>;
}

export default GuestLayout;