import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PetsIcon from '@mui/icons-material/Pets';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useTheme } from '../contexts/ThemeContext';
import { useLayout } from '../contexts/LayoutContext';
import '../../src/styles/index.css';

const NewAppBar= () => {
    const { isNavOpen, toggleNav } = useLayout();
    const [isAuth, setIsAuth] = useState(false);  
    const [anchorEl, setAnchorEl] = useState(null); 

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const toggleAuth = () => {
        setIsAuth(!isAuth);
    };

    return (
        <AppBar position="sticky"
        style={{zIndex:1}}>
            <Toolbar >
                <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'evenly' }}>
                    {/* Left Icons */}
                    <IconButton color="inherit">
                        <AccountBalanceWalletIcon />
                    </IconButton>
                    <IconButton color="inherit">
                        <PetsIcon />
                    </IconButton>
                </Box>

                {/* Right Section */}
                <Box sx={{ display: 'flex', alignItems: 'evenly' }}>
                    {isAuth ? (
                        <>
                            <IconButton color="inherit" onClick={toggleAuth}>
                                <ExitToAppIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <IconButton color="inherit" onClick={() => setIsAuth(true)}>
                                <PersonAddIcon />
                            </IconButton>
                            <IconButton color="inherit" onClick={toggleAuth}>
                                <VpnKeyIcon />
                            </IconButton>
                        </>
                    )}

                    {/* Menu Icon for future functionalities */}
                    <IconButton color="inherit" onClick={handleMenuOpen}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
                        <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default NewAppBar;