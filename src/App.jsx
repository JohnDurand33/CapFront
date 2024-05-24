import React, { useState, useEffect, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { CssBaseline, Typography, Box, ThemeProvider } from '@mui/material';
import MainView from './components/MainView';
import LogIn from './components/LogIn';
import SignUpForm from './components/SignUpForm';
import DogSearch from './components/DogSearchForm';
import DogSearchDrawer from './components/DogSearchDrawer';
import { getTheme } from './styles/theme';
import { useLogin } from './contexts/LoginContext';
import Layout from './components/Layout';
import { useMediaQuery } from '@mui/material';
import useAppBarHeight from './hooks/useAppBarHeight';
import Home from './components/Home';
import BreedView from './components/BreedView';

const App = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');
    const [appBarHeight, appBarRef] = useAppBarHeight();

    useEffect(() => {
        setMode(prefersDarkMode ? 'dark' : 'light');
    }, [prefersDarkMode]);

    const theme = useMemo(() => getTheme(mode), [mode]);

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
                <Routes>
                <Route path="/*" element={<Layout toggleMode={toggleMode} mode={mode} appBarRef={appBarRef}  appBarHeight={appBarHeight} />}>
                    <Route index element={<Home />} />
                    <Route path="signup" element={<SignUpForm />} />
                    <Route path="login" element={<LogIn />} />
                    <Route path="breedview" element={<BreedView />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
};

export default App;