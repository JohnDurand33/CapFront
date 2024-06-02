import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, getZipCode, getState, setLocalToken, setLocalZipCode, setLocalState, isTokenExpired, refreshToken } from '../utils/auth';
import api from '../components/ApiBackBP';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [state, setState] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = getToken();
        const storedZip = getZipCode();
        const storedState = getState();
        if (storedToken && !isTokenExpired(storedToken)) {
            setToken(storedToken);
            setLoggedIn(true);
        } else if (window.location.pathname !== '/signup') {
            navigate('/login');
        }
        else if (storedZip) setZipCode(storedZip);
        else if (storedState) setState(storedState);
    }, [navigate]);

    useEffect(() => {
        const interval = setInterval(async () => {
            const storedToken = getToken();
            if (storedToken && isTokenExpired(storedToken)) {
                console.log('thinks token is expired, trying to refresh token');
                const newToken = await refreshToken(storedToken, setToken);
                console.log('token dhould be refreshed now', newToken);
                if (!newToken) {
                    navigate('/login');
                }
            }
        }, 60 * 1000); // Check every minute

        return () => clearInterval(interval);
    }, [setToken, navigate]);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.status === 200) {
                const { token, zip_code, state } = response.data;
                setLocalToken(token);
                setLocalState(state);
                setLocalZipCode(zip_code);
                setToken(token);
                setZipCode(zip_code);
                setState(state);
                setLoggedIn(true);
                return true;
            }
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setZipCode('');
        setState('');
        setLoggedIn(false);
        navigate('/login');
    };

    return (
        <LoginContext.Provider value={{ loggedIn, token, zipCode, state, setLoggedIn, setToken, setZipCode, setLocalToken, setState, login, logout }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);
