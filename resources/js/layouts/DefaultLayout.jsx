import { Outlet } from "react-router-dom";


function DefaultLayout()
{
    return (
        <div className="">
            <Outlet/>
        </div>
    );
}

export default DefaultLayout;