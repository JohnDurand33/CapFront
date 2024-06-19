import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: 'https://capback-tvy5.onrender.com',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(
    config => {
        const token = sessionStorage.getItem('token'); 
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default api;