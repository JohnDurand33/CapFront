import {useEffect} from 'react';
import { useLogin } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LogOut = () => {
    const { setLoggedIn, logout } = useLogin();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/login');
    };

    useEffect(() => {
        handleLogout();
    }, []);

    return null; 
};

export default LogOut;