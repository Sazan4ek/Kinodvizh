import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContextProvider";

function AdminLayout()
{
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(user?.role?.name !== 'admin') navigate(-1);
    })

    return <Outlet/>;
}

export default AdminLayout;