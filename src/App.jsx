import { CssBaseline, ThemeProvider, useMediaQuery } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import BreedView from './components/BreedSearchView';
import Home from './components/Home';
import Layout from './components/Layout';
import LogIn from './components/LogIn';
import SignUpForm from './components/SignUpForm';
import useAppBarHeight from './hooks/useAppBarHeight';
import { getTheme } from './styles/theme';

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
                    <Route path="breedsearchview" element={<BreedView />} />
                </Route>
            </Routes>
        </ThemeProvider>
    );
};

export default App;