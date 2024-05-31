import React, { createContext, useContext, useState, useEffect } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const [zipCode, setZipCode] = useState(null);
    const [state, setState] = useState(null);

    const login = async (email, password) => {
        try {
            const response = await fetch('http://127.0.0.1:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
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
        setToken(null);
        setZipCode(null);
        setLoggedIn(false);
    };

    return (
        <LoginContext.Provider value={{ loggedIn, token, state, zipCode, login, logout, setToken, setState, setZipCode, setLoggedIn }}>
            {children}
        </LoginContext.Provider>
    );
};

export const useLogin = () => useContext(LoginContext);