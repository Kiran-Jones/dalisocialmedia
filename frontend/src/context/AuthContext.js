import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const token = sessionStorage.getItem('authToken');
        if (token) {
            setAuthToken(token);
        }
        setIsLoading(false);
    }, []);

    const login = (token) => {
        sessionStorage.setItem('authToken', token);
        setAuthToken(token);
    };

    const logout = () => {
        sessionStorage.removeItem('authToken');
        setAuthToken(null);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ authToken, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};