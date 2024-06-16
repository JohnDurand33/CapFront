// src/main.js or src/index.js
import './polyfills'; // Ensure polyfills are imported at the very top

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { MultiBackend } from 'react-dnd-multi-backend';
import { HTML5toTouch } from './dndConfig';

// Get the root element from the DOM
const container = document.getElementById('root');

// Create a root
const root = createRoot(container);

// Initial render
root.render(
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </DndProvider>
);