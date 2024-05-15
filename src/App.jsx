import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { CssBaseline, Typography, Box } from '@mui/material';
import NavRail from './components/NavRail';
import NewAppBar from './components/NewAppBar';
import { useTheme } from "./contexts/ThemeContext";
import { LayoutProvider } from './contexts/LayoutContext';



const App = () => {
    const theme = useTheme();

    return (
        <LayoutProvider>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                    <NewAppBar position={"sticky"} style={{zIndex:11}}/>
                    <NavRail />
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
            </ThemeProvider>
        </LayoutProvider>
    );
}

export default App;
