import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";

function MainLayout()
{
    return (
        <div className="wrapper">
            <Header/>
            <main className="main-container">
                <Outlet/>      
            </main>
            <Footer/>
        </div>
    );
}

export default MainLayout;