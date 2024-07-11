import { Link, NavLink } from "react-router-dom";
import './Header.css'
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";
function Header()
{
    const { user, getUser, logout } = useContext(AuthContext);

    return (
        <header className="header-container">
            <nav className="nav-bar">
                <NavLink className="nav-item" to={'/'}>Home</NavLink>
                <NavLink className="nav-item" to={'/films'}>Films</NavLink>
                <NavLink className="nav-item" to={'/series'}>Series</NavLink>
            </nav>
            <div className="user-panel">
                {user ? (
                    <>
                        {user?.firstName}
                        <button onClick={logout}>Log out</button>
                    </>
                ) : (
                    <>
                        <Link className="nav-item" to={'/register'}>Register</Link>
                        <Link className="nav-item" to={'/login'}>Login</Link>
                        <span className="white">Nobody</span>
                    </>
                )}
            </div>
        </header>
    );
}

export default Header;