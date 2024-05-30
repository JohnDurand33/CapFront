import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context
const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [zipCode, setZipCode] = useState(null);
    const [state, setState] = useState(null);

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
                setToken(data.token);
                setZipCode(data.zip_code);
                setState(data.state);
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
        localStorage.removeItem('zip_code');
        setToken(null);
        setZipCode(null);
        setLoggedIn(false);
    };

    return (
        <LoginContext.Provider value={{ loggedIn, token, login, logout, setToken, setState, setZipCode, setLoggedIn }}>
            {children}
        </LoginContext.Provider>
    );
};