import React, { useState, useContext, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PetsIcon from '@mui/icons-material/Pets';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ThemeToggleButton from './ThemeToggleButton';
import { useTheme } from '@mui/material/styles';
import { useLayout } from '../contexts/LayoutContext';
import { useLogin } from '../contexts/LoginContext';
import '../../src/styles/index.css';

const NewAppBar = ({ toggleMode, mode }) => {
    const theme = useTheme();
    const { isNavOpen, toggleNav } = useLayout();
    const [anchorEl, setAnchorEl] = useState(null);
    const { loggedIn, setIsLoggedIn } = useLogin();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const toggleIsLoggedIn = () => {
        setIsLoggedIn(!loggedIn);
        console.log(`User is ${loggedIn ? 'logged in' : 'logged out'}`);
    };


    return (
        <AppBar position="sticky" sx={{ zIndex: theme.zIndex.appBar }}>
            <Toolbar >
                <IconButton color="inherit" onClick={toggleNav}>
                    <MenuIcon />
                </IconButton>
                <Box  x={{ zIndex: (theme) => theme.zIndex.drawer + 1, width: `calc(100% - ${isNavOpen ? 240 : 0}px)` }}>
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
                    {loggedIn ? (
                        <>
                            <IconButton color="inherit" onClick={toggleIsLoggedIn}>
                                <ExitToAppIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <IconButton color="inherit" component={Link} to='/signup'>
                                <PersonAddIcon />
                            </IconButton>
                                <IconButton color="inherit" onClick={toggleIsLoggedIn}>
                                <VpnKeyIcon />
                            </IconButton>
                        </>
                    )}

                    {/* Menu Icon for future functionalities */}
                    <ThemeToggleButton toggleMode={toggleMode} mode={mode} />
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