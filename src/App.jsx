import { useState, useMemo, createContext}from 'react';
import { Route, Routes, BrowserRouter as Router, useNavigate } from 'react-router-dom';
import { LoginProvider } from './contexts/LoginContext';
import { LayoutProvider } from './contexts/LayoutContext';
import { DogSearchProvider } from './contexts/DogSearchContext';
import DndContext from './contexts/DndContext';
import BreedSearchView from './components/BreedSearchView';
import Home from './components/Home';
import Layout from './components/Layout';
import LogIn from './components/LogIn';
import SignUpForm from './components/SignUpForm';
import useAppBarHeight from './hooks/useAppBarHeight';
import DogSearchView from './components/DogSearchView';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';
import { ThemeProvider, useMediaQuery, CssBaseline } from '@mui/material';
import { getTheme } from './styles/theme'

const App = () => {
    const [appBarHeight, appBarRef] = useAppBarHeight();
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

    const theme = useMemo(() => getTheme(mode), [mode]);

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };
    

    return (
        <Router>
            <LoginProvider>
                <ThemeProvider theme={theme}>  
                    <CssBaseline />        
                    <LayoutProvider>
                        <DogSearchProvider>
                            <DndContext>
                                <Routes>
                                    <Route path="/*" element={<Layout appBarRef={appBarRef} appBarHeight={appBarHeight} toggleMode={toggleMode} mode={mode} />}>
                                        <Route index element={<Home />} />
                                        <Route path="signup" element={<SignUpForm />} />
                                        <Route path="login" element={<LogIn />} />
                                            <Route element={<ProtectedRoute />}>
                                                <Route path="home" element={<Home />} />
                                                <Route path="breedview" element={<BreedSearchView />} />
                                                <Route path="dogsearch" element={<DogSearchView />} />
                                        </Route>
                                        <Route path="*" element={<NotFound />} />
                                    </Route>
                                </Routes>
                        </DndContext>
                    </DogSearchProvider>
                </LayoutProvider>
            </ThemeProvider>
        </LoginProvider>
        </Router >
    );
};

export default App;