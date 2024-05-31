import { createContext, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { getTheme } from './styles/theme';
import App from './App';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';

const Main = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

    const theme = useMemo(() => getTheme(mode), [mode]);

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <App mode={mode} toggleMode={toggleMode} />
            </Router>
        </ThemeProvider>
    );
};

createRoot(document.getElementById('root')).render(<Main />);


