import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { authToken, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!authToken) {
        return <Navigate to="/sign-in" />;
    }

    return children

};

export default ProtectedRoute;