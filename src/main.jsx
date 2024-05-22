import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LoginProvider } from './contexts/LoginContext.jsx'
import { LayoutProvider } from './contexts/LayoutContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { DogSearchProvider } from './contexts/DogSearchContext.jsx';
import './styles/index.css'



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <LoginProvider>
                <LayoutProvider>
                    <DogSearchProvider>
                        <App />
                    </DogSearchProvider>
                </LayoutProvider>
            </LoginProvider>
        </BrowserRouter>
    </React.StrictMode>
)
