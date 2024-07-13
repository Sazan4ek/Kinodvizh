import { useRoutes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import Error404 from "./pages/Error404";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MainLayout from "./layouts/MainLayout"; 
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";

function Router()
{
    return useRoutes([
        {
            path: '/',
            element: <MainLayout/>,
            children: [
                {
                    path: '',
                    element: <Home/>
                },
                {
                    path: '',
                    element: <DefaultLayout/>,
                    children: [
                        {
                            path: 'films',
                            element: <></>
                        }
                    ]
                },
                {
                    path: '',
                    element: <GuestLayout/>,
                    children: [
                        {
                            path: 'login',
                            element: <Login/>
                        },
                        {
                            path: 'register',
                            element: <Register/>
                        }
                    ]
                },
                {
                    path: '',
                    element: <AdminLayout/>,
                    children: [
                        {
                            path: 'dashboard',
                            element: <Dashboard/>
                        }
                    ]
                },
                {
                    path: '*',
                    element: <Error404/>
                }
            ]
        }
    ]);
}

export default Router;