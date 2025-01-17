import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from "./components/Profile";
import Layout from "./components/Layout";

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/sign-in" element={<SignIn />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route
                            path="/home"
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                        <Route
                            path="/home/:id"
                            element={
                            <ProtectedRoute>
                                <Profile/>
                            </ProtectedRoute>
                            }
                        />
                        <Route path="/" element={<Navigate to="/sign-up" />} />
                    </Routes>
                </Layout>
            </Router>
        </AuthProvider>
    );
};

export default App;