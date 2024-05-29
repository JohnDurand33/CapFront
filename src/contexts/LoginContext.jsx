import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [zipCode, setZipCode] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedZipCode = localStorage.getItem('zip_code');
        if (storedToken) {
            setToken(storedToken);
            setLoggedIn(true);
        }
        if (storedZipCode) {
            setZipCode(storedZipCode);
        }
    }, []);

    const login = async (email, password) => {
        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token);
                localStorage.setItem('zip_code', data.zip_code);
                setToken(data.token);
                setZipCode(data.zip_code);
                setLoggedIn(true);
                return true;
            } else {
                return false;
            }
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('zip_code');
        setToken(null);
        setZipCode(null);
        setLoggedIn(false);
    };

    const getZipCode = () => {
        return zipCode;
    };

    return (
        <LoginContext.Provider value={{ loggedIn, token, login, logout, getZipCode, setLoggedIn }}>
            {children}
        </LoginContext.Provider>
    );
};