import { useRoutes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import DefaultLayout from "./layouts/DefaultLayout";
import GuestLayout from "./layouts/GuestLayout";
import Error404 from "./pages/Error404";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MainLayout from "./layouts/MainLayout"; 

function Router()
{
    return useRoutes([
        {
            path: '/',
            element: <MainLayout/>,
            children: [
                {
                    path: '/',
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
                    path: '/',
                    element: <DefaultLayout/>,
                    children: [
                        
                    ]
                },
                {
                    path: '/',
                    element: <AdminLayout/>,
                    children: [
                        
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