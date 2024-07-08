import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar:React.FC=()=>{
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li><Link to="/" className="navbar-link">Головна</Link></li>
                <li><Link to="/about" className="navbar-link">Про нас</Link></li>
                <li><Link to="/dashboard" className="navbar-link">Інформаційна панель</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;