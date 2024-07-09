import { NavLink } from "react-router-dom";
import './Header.css'
function Header()
{
    return (
        <header className="header-container">
            <nav className="nav-bar">
                <NavLink className="nav-item" to={'/'}>Home</NavLink>
                <NavLink className="nav-item" to={'/films'}>Films</NavLink>
                <NavLink className="nav-item" to={'/series'}>Series</NavLink>
                <NavLink className="nav-item" to={'/register'}>Register</NavLink>
                <NavLink className="nav-item" to={'/login'}>Login</NavLink>
            </nav>
        </header>
    );
}

export default Header;