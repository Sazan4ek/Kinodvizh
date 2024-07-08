import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

function MainLayout()
{
    return (
        <div className="">
            Hi
            <Header/>
            <Outlet/>
            <Footer/>
        </div>
    );
}

export default MainLayout;