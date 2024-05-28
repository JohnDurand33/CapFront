import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password });
            if (response.status === 200) {
                setToken(response.data.token);
                setLoggedIn(true);
                return true;
            }
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const logout = async () => {
        if (token) {
            try {
                const response = await axios.post('http://localhost:5000/auth/logout', '', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                if (response.status === 200) {
                    setToken(null);
                    setLoggedIn(false);
                    navigate('/login');
                }
            } catch (error) {
                console.error('Issue with token / localStorage', error);
                setToken(null);
                setLoggedIn(false);
                navigate('/login');
            }
        } else {
            setToken(null);
            setLoggedIn(false);
            navigate('/login');
        }
    };

    const checkToken = async () => {
        if (token) {
            try {
                const response = await axios.get('http://localhost:5000/auth/protected', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (response.status === 200) {
                    return true;
                } else {
                    throw new Error('Token not valid');
                }
            } catch (error) {
                console.error('Token validation failed:', error);
                setToken(null);
                navigate('/login');
            }
        } else {
            navigate('/login');
        }
    };

    return (
        <LoginContext.Provider value={{ loggedIn, setLoggedIn, login, logout, checkToken, token }}>
            {children}
        </LoginContext.Provider>
    );
};

export default LoginContext;