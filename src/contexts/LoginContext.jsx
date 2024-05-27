import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginContext = createContext();

export const useLogin = () => useContext(LoginContext);

export const LoginProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:5000/auth/login', { email, password });
            if (response.status === 200) {
                localStorage.setItem('token', response.data.token);
                setLoggedIn(true);
                return true;
            }
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    };

    const logout = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.post('http://localhost:5000/auth/logout', '', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });

                if (response.status === 200) {
                    localStorage.removeItem('token');
                    setLoggedIn(false);
                    navigate('/login'); // Redirect to login after logout
                }
            } catch (error) {
                console.error('Issue with token / localStorage', error);
                setLoggedIn(false);
                navigate('/login');
            }
        } else {
            setLoggedIn(false);
            navigate('/login'); // Redirect to login if no token is found
        }
    };

    const checkToken = async () => {
        const token = localStorage.getItem('token');
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
                    throwNewError('Token not valid')
                    
                }
            } catch (error) {
                console.error('Token validation failed:', error);
                localStorage.removeItem('token');
                navigate('/login');
            }
        }
        else {
            navigate('/login');
        }
};

    return (
        <LoginContext.Provider value={{ loggedIn, setLoggedIn, login, logout, checkToken }}>
            {children}
        </LoginContext.Provider>
    )
};

export default LoginContext;