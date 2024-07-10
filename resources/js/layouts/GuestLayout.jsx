import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
// import { Context } from "../contexts/ContextProvider";

function GuestLayout()
{
    
    return (
        <div className="">
            <Outlet/>
        </div>
    );
}

export default GuestLayout;