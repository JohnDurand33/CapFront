import React from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { CssBaseline, AppBar, Toolbar, Typography, Box } from '@mui/material';
import NavigationRail from './components/NavRail';
import { getTheme } from './styles/theme';

const theme = getTheme('light');

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ display: 'flex', width: '100vw', height: '100vh' }}>
                <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1, width: 'calc(100% - 240px)', ml: 240 }}>
                    <Toolbar>
                        <Typography variant="h6" noWrap>
                            Application Title
                        </Typography>
                    </Toolbar>
                </AppBar>
                <NavigationRail />
                <Box component="main" sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - 240px)` }, marginTop: 8 }}>
                    {/* Main content area with top padding to avoid overlap with AppBar */}
                    <Typography paragraph>
                        Hello, this is the main content area!
                    </Typography>
                    {/* More content components or elements */}
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default App;
