import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, getZipCode, getState, setLocalToken, setLocalZipCode, setLocalState, removeLocalToken, removeLocalState, removeLocalZipCode, isTokenExpired, refreshToken } from '../utils/auth';
import api from '../contexts/api';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [state, setState] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('LoginProvider: Initial authentication check');
        const storedToken = getToken();
        const storedZip = getZipCode();
        const storedState = getState();

        if (!storedToken) {
            logout();
        } else if (storedZip) {
            setZipCode(storedZip);
        } else if (storedState) {
            setState(storedState);
        } else {
            if (!isTokenExpired(storedToken)) {
                setToken(storedToken);
                setLoggedIn(true);
            } else {
                console.log('Token is expired');
                logout();
            };
        };
        return () => {
            logout();
        }
    }, []); 

    // Periodic token refresh check
    useEffect(() => {
        const interval = setInterval(async () => {
            if (token && isTokenExpired(token)) {
                console.log(`Token is expired, trying to refresh token`);
                const currToken = token;
                const newToken = await refreshToken(currToken, setToken, setState, setZipCode);
                if (!newToken) {
                    console.log('Token refresh failed, if this keeps happening make sure newToken has been given enough time to set before logging out.');
                    logout();
                } else {
                    console.log('Token refresh successful');
                }}
        }, 60 * 1000); 
        return () => clearInterval(interval);
    }), [token];

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.status === 200) {
                const { token, zip_code, state } = response.data;
                console.log('Login successful:', response.data);
                setLocalToken(token);
                setLocalState(state);
                setLocalZipCode(zip_code);
                setToken(token);
                setZipCode(zip_code);
                setState(state);
                setLoggedIn(true);
                logToken();
                return true;
            }
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

const logout = () => {
    removeLocalToken('token');
    removeLocalState('state');
    removeLocalZipCode('zipCode');
    setZipCode(null);
    setState(null);
    setToken(null)
    setLoggedIn(false);
    navigate('/login');
    };

    const logToken = () => {
        console.log('Token:', token);
    }

    return (
        <LoginContext.Provider value={{ loggedIn, token, zipCode, state, getToken, getState, getZipCode, setLoggedIn, setToken, setZipCode, setLocalToken, setState, login, logout, logToken }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);
