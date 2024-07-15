import { useRoutes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import GuestLayout from "./layouts/GuestLayout";
import Error404 from "./pages/Error404";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MainLayout from "./layouts/MainLayout"; 
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home/Home";
import AuthLayout from "./layouts/AuthLayout";
import FilmPage from "./pages/FilmPage/FilmPage";
import SeriesPage from "./pages/SeriesPage/SeriesPage";

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
                    path: '/film/:filmId',
                    element: <FilmPage/>
                },
                {
                    path: '/series/:seriesId',
                    element: <SeriesPage/>
                },
                {
                    path: '',
                    element: <AuthLayout/>,
                    children: [
                        {
                            path: 'me',
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