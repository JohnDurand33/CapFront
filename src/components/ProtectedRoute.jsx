import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, isTokenExpired } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const token = getToken();

    useEffect(() => {
        if (!token || isTokenExpired(token)) {
            navigate('/login');
        }
    }, [token, navigate]);

    return token && !isTokenExpired(token) ? children : null;
};

export default ProtectedRoute;