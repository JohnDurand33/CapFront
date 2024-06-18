import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useLogin } from '../contexts/LoginContext';

const ProtectedRoute = () => {
    const { loggedIn, logout } = useLogin();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            logout();
            navigate('/login');
        }
    }, [loggedIn, logout, navigate]);

    return loggedIn ? <Outlet /> : null;
};

export default ProtectedRoute;