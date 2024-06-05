import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getToken, setSessionToken, removeSessionToken, isTokenExpired, refreshToken } from '../utils/auth';
import api from '../contexts/api';
import { jwtDecode } from 'jwt-decode';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        console.log('LoginProvider: Initial authentication check');
        const storedToken = getToken();

        if (!storedToken) {
            console.log('No token found');
            setLoggedIn(false);
            logout();
        } else {
            if (!isTokenExpired(storedToken)) {
                refreshToken(storedToken, setToken, setLoggedIn);
                console.log('Token is now valid');
            } else {
                console.log('Token is expired');
                logout();
            }
        }
    }, []);

    useEffect(() => {
        const checkAndRefreshToken = async () => {
            if (loggedIn && token) {
                console.log('LoginProvider: Token check interval');
                if (isTokenExpired(token)) {
                    console.log('Token is expired, trying to refresh token');
                    const success = await refreshToken(token, setToken, setLoggedIn);
                    if (success) {
                        console.log('Token refresh successful');
                    } else {
                        console.log('Token refresh failed. Logging out.');
                        logout();
                    }
                } else {
                    console.log('Token is still valid');
                }
            } else {
                console.log('No token found');
            }
        };
        const interval = setInterval(checkAndRefreshToken, 60 * 1000);
        return () => clearInterval(interval);
    }, [token, loggedIn]);

    const login = async (email, password) => {
        try {
            const response = await api.post('/auth/login', { email, password });
            if (response.status === 200) {
                const { token } = response.data;
                console.log('Login successful:', response.data);
                setSessionToken(token);
                setToken(token);
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
        removeSessionToken();
        setToken(null);
        setLoggedIn(false);
        navigate('/home');
    };

    const logToken = () => {
        console.log('Token:', token);
    };

    const getUserInfo = () => {
        if (token) {
            const decodedToken = jwtDecode(token);
            return { email: decodedToken.email, state: decodedToken.state, zip_code: decodedToken.zip_code };
        }
        return null;
    };

    return (
        <LoginContext.Provider value={{ loggedIn, token, getToken, setLoggedIn, setToken, setSessionToken, login, logout, logToken, getUserInfo }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);