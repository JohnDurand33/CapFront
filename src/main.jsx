import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import { getTheme } from './styles/theme';

const Main = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = React.useState(prefersDarkMode ? 'dark' : 'light');
    const theme = React.useMemo(() => getTheme(mode), [mode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    );
};

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<Main />);
