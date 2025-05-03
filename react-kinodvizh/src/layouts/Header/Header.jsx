import { Link, NavLink } from "react-router-dom";
import './Header.css'
import { useAuth } from "../../contexts/AuthContextProvider";
import { RiUserLine } from "react-icons/ri";

function Header()
{
    const { user, logout } = useAuth();

    return (
        <header className="header-container">
            <div className="logo-container">
                <img src="/img/kinodvizh-high-resolution-logo-transparent.png" alt="logo-image" height={'100%'}/>
            </div>
            <nav className="nav-bar">
                <NavLink className="nav-item" to={{ pathname: '/', search: "watchableType=films" }}>Home</NavLink>
                <NavLink className="nav-item" to={{ pathname: '/', search: "watchableType=films" }}>Films</NavLink>
                <NavLink className="nav-item" to={{ pathname: '/', search: "watchableType=series" }}>Series</NavLink>
            </nav>
            <div className="user-panel">
                {user ? (
                    <>
                        <Link to={`/users/${user?.id}/profile`} className="d-flex gap-2 without-underline">
                            <RiUserLine className="user-icon"/>
                            <span className="user-fullName">
                                {user.first_name + ' '}
                                {user.last_name}
                            </span>
                         </Link>
                        <button className="btn btn-warning" onClick={logout}>Log out</button>
                    </>
                ) : (
                    <>
                        <Link className="nav-item" to={'/register'}>Register</Link>
                        <Link className="nav-item" to={'/login'}>Login</Link>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;