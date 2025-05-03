import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import { useAuth } from "../contexts/AuthContextProvider";
import Spinner from "../components/Spinner/Spinner";

function MainLayout()
{
    const { userLoading } = useAuth();

    return (
        <>
            {userLoading && <Spinner />}
            <div className="wrapper" style={{ display: userLoading ? 'none' : 'flex' }}>
                <Header/>
                <main className="main-container">
                    <Outlet/>      
                </main>
                <Footer/>
            </div>
        </>
    );
}

export default MainLayout;