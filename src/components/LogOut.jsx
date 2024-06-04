import { useEffect } from 'react';
import { useLogin } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';

const LogOut = () => {
    const { logout } = useLogin();
    const navigate = useNavigate();

    useEffect(() => {
        logout();
        navigate('/login');
    }, []);
};

export default LogOut;