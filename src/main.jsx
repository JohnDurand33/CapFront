import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './styles/index.css';

const Main = () => {
    return (
            <App />
    );
};
createRoot(document.getElementById('root')).render(<Main />);


