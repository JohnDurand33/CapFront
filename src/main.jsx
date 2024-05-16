import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { LoginProvider } from './contexts/LoginContext.jsx'
import { LayoutProvider } from './contexts/LayoutContext.jsx'
import './styles/index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <LoginProvider>
            <LayoutProvider>
                <App />
            </LayoutProvider>
        </LoginProvider>
    </React.StrictMode>,
)
