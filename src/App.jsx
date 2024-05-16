import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Typography, Box, ThemeProvider, Grid } from '@mui/material';
import NavRail from './components/NavRail';
import NewAppBar from './components/NewAppBar';
import SignUpForm from './components/SignUpForm';
import { getTheme } from './styles/theme';
import { useMediaQuery } from '@mui/material';

const MainContent = () => {


    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            height: '100vh',
            padding: 3,
            backgroundColor: 'background.default'
        }}>
            <Grid container spacing={2} sx={{ flex: 1 }}>
                <Grid item xs={7}>
                    <SignUpForm />
                </Grid>
                <Grid item xs={4}>
                    <AnotherComponent />
                </Grid>
                <Grid item xs={1}>
                    {/* This Grid item can be used for padding or gutters */}
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ height: '16.67%' }}> {/* 2 out of 12 units */}
                <Grid item xs={12}>
                    <Routes>
                        <Route path="/bottom" element={<BottomComponent />} />
                    </Routes>
                </Grid>
            </Grid>
        </Box>
    );
}


const App = () => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const [mode, setMode] = useState(prefersDarkMode ? 'dark' : 'light');

    useEffect(() => {
        setMode(prefersDarkMode ? 'dark' : 'light');
    }, [prefersDarkMode]);

    const theme = useMemo(
        () => getTheme(mode),
        [mode]
    );

    const toggleMode = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

        return (
                    <ThemeProvider theme={theme}>
                        <CssBaseline />
                        <Router>
                            <NewAppBar position="sticky" style={{ zIndex: 11 }} toggleMode={toggleMode} mode={mode}/>
                            <NavRail toggleMode={toggleMode} mode={mode} />
                            <Routes>
                                {/* <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} /> */}
                                <Route path="/signup" element={<SignUpForm />} />
                                {/* <Route path="/login" element={<Login />} /> */}
                                {/* Add more routes as needed */}
                            </Routes>
                            <Box component="main"
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100vw',
                                    height: '100vh'
                                }}>
                                {/* Main content area with top padding to avoid overlap with AppBar */}
                                <Typography paragraph sx={{
                                    ml: '240px', marginTop: 2
                                }}>
                                    Hello, this is the main content area!
                                </Typography>
                                {/* More content components or elements */}
                            </Box>
                        </Router>
                    </ThemeProvider>

        );
    }


export default App;
