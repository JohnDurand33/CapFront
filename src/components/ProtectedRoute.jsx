import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../contexts/LoginContext';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { token, isTokenExpired, loggedIn } = useLogin();

    useEffect(() => {
        if (!token || isTokenExpired(token)) {
            navigate('/login');
        }
    }, [token, navigate]);

    return token && loggedIn ? children : null;
};

export default ProtectedRoute;