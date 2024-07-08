import { Outlet } from "react-router-dom";

function GuestLayout()
{
    return (
        <div className="">
            guest
            <Outlet/>
        </div>
    );
}

export default GuestLayout;