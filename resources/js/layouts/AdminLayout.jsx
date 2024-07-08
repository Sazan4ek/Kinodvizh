import { Outlet } from "react-router-dom";


function AdminLayout()
{
    return (
        <div className="">
            admin
            <Outlet/>
        </div>
    );
}

export default AdminLayout;