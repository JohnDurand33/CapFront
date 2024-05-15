import React, { createContext, useContext, useMemo, useState } from 'react';
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import { getTheme } from '../styles/theme'; 

const ThemeContext = createContext({
    mode: 'dark',
    toggleTheme: () => { }, 
    theme: getTheme('dark')  
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    const [mode, setMode] = useState('dark');
    const theme = useMemo(() => getTheme(mode), [mode]);

    const toggleTheme = () => {
        setMode(prevMode => prevMode === 'light' ? 'dark' : 'light');
    };

    const value = useMemo(() => ({ mode, toggleTheme, theme }), [mode, theme]);

    return (
        <ThemeContext.Provider value={value}>
            <MUIThemeProvider theme={theme}>
                {children}
            </MUIThemeProvider>
        </ThemeContext.Provider>
    );
};