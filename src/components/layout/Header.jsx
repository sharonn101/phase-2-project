import React from "react";
import { Link } from "react-router-dom";

function Header(){
    return(
        <div>
            <header className="header">
                <h1 className="logo">📦 Inventory Dashboard</h1>
                <nav className="nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/admin">Admin</Link>
                </nav>
            </header>
        </div>
    )
}
export default Header;