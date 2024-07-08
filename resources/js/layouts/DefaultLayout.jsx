import { Outlet } from "react-router-dom";


function DefaultLayout()
{
    return (
        <div className="">
            default
            <Outlet/>
        </div>
    );
}

export default DefaultLayout;