import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/sign-in');
    };

    return (
        <div className="auth-container">
            <h2>Dashboard</h2>
            <p>Welcome to your dashboard!</p>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Dashboard;