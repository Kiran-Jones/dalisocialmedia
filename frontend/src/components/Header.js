import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/header.css';

const Header = () => {
    const navigate = useNavigate();

    return (
        <header className="header">
            <img
                src="/logo.png"
                alt="Site Logo"
                className="site-logo"
                onClick={() => navigate('/home')}
            />
        </header>
    );
};

export default Header;