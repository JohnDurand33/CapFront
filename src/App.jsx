import React, { createContext, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CssBaseline, Typography, Box } from '@mui/material';
import NavRail from './components/NavRail';
import AppBar from './components/NewAppBar';
import { ThemeProvider } from "./contexts/ThemeContext";
import { LayoutProvider } from './contexts/LayoutContext';
import { LoginProvider } from './contexts/LoginContext';
import SignUpForm from './components/SignUpForm';

const App = () => {

    return (
        <LoginProvider>
            <LayoutProvider>
                <ThemeProvider>
                    <CssBaseline />
                    <Router>
                        <AppBar position="sticky" style={{zIndex:11}} />
                        <NavRail />
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
                            ml:'240px', marginTop: 2
                        }}>
                                Hello, this is the main content area!
                            </Typography>
                                {/* More content components or elements */}
                        </Box>
                    </Router>
                </ThemeProvider>
            </LayoutProvider>
        </LoginProvider>
    );
}

export default App;
