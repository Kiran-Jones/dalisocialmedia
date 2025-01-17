import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from './Header';
import Navbar from './Navbar';
import Footer from './Footer';
import '../styles/layout.css';

const Layout = ({ children }) => {
    const { authToken } = useAuth();
    const location = useLocation();
    const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

    return (
        <div className="layout">
            <Header />
            {authToken && !isAuthPage && <Navbar />}
            <main className="main-content">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;