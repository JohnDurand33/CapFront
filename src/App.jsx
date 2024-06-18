import { useState, useEffect, useMemo } from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import { LoginProvider } from './contexts/LoginContext';
import { LayoutProvider } from './contexts/LayoutContext';
import { DogSearchProvider } from './contexts/DogSearchContext';
import BreedSearchView from './components/BreedSearchView';
import Home from './components/Home';
import Layout from './components/Layout';
import LogIn from './components/LogIn';
import SignUpForm from './components/SignUpForm';
import useAppBarHeight from './hooks/useAppBarHeight';
import DogSearchView from './components/DogSearchView';
import NotFound from './components/NotFound';
import { ThemeProvider, useMediaQuery, CssBaseline } from '@mui/material';
import Instructions from './components/Instructions';
import { getTheme } from './styles/theme';
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute

const App = () => {
    const [appBarHeight, appBarRef] = useAppBarHeight();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

    const theme = useMemo(() => getTheme(mode), [mode]);

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    return (
        <LoginProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <LayoutProvider>
                    <DogSearchProvider>
                            <Routes>
                                <Route path="/" element={<Layout appBarRef={appBarRef} appBarHeight={appBarHeight} toggleMode={toggleMode} mode={mode} />}>
                                <Route index element={<Home />} />
                                <Route path="home" element={<Home />} />
                                <Route path="signup" element={<SignUpForm />} />
                                <Route path="login" element={<LogIn />} />
                                <Route path="instructions" element={<Instructions />} />
                                <Route element={<ProtectedRoute />}>
                                    <Route path="breedview" element={<BreedSearchView />} />
                                    <Route path="dogsearch" element={<DogSearchView />} />
                                </Route>
                                </Route>
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                    </DogSearchProvider>
                </LayoutProvider>
            </ThemeProvider>
        </LoginProvider>
    );
};

export default App;