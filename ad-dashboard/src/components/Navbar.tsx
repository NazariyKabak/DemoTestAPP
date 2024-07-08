import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link className="navbar-link" to="/">Головна</Link>
                </li>
                <li className="navbar-item">
                    <Link className="navbar-link" to="/about">Про нас</Link>
                </li>
                <li className="navbar-item">
                    <Link className="navbar-link" to="/dashboard">Інформаційна панель</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
