import { useRoutes } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import GuestLayout from "./layouts/GuestLayout";
import Error404 from "./pages/Error404";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import MainLayout from "./layouts/MainLayout"; 
import Home from "./pages/Home/Home";
import AuthLayout from "./layouts/AuthLayout";
import FilmPage from "./pages/FilmPage/FilmPage";
import SeriesPage from "./pages/SeriesPage/SeriesPage";
import UpdateFilmPage from "./pages/UpdateFilmPage/UpdateFilmPage";
import UpdateSeriesPage from "./pages/UpdateSeriesPage/UpdateSeriesPage";
import UserProfile from "./pages/UserProfile/UserProfile";
import UpdateUserPage from "./pages/UpdateUserPage/UpdateUserPage";

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
                    path: '/films/:filmId',
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
                            path: 'users/:userId/profile',
                            element: <UserProfile/>
                        },
                        {
                            path: 'users/:userId/profile/edit',
                            element: <UpdateUserPage/>
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
                    path: '/admin/',
                    element: <AdminLayout/>,
                    children: [
                        {
                            path: 'films/:filmId/edit',
                            element: <UpdateFilmPage />
                        },
                        {
                            path: 'series/:seriesId/edit',
                            element: <UpdateSeriesPage />
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