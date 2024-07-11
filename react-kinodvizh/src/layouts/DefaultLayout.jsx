import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

function DefaultLayout()
{

    return <Outlet/>
}

export default DefaultLayout;