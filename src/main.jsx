// src/main.js or src/index.js
import './polyfills'; // Ensure polyfills are imported at the very top
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';


const container = document.getElementById('root');


const root = createRoot(container);


root.render(
        <BrowserRouter>
            <App />
        </BrowserRouter>

);