import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PetsIcon from '@mui/icons-material/Pets';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ThemeToggleButton from './ThemeToggleButton';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { useLayout } from '../contexts/LayoutContext';
import { useLogin } from '../contexts/LoginContext';


const NewAppBar = ({ toggleMode, mode, appBarRef }) => {
    const theme = useTheme();;
    const { isNavOpen, toggleNav, isFavBreedsRailOpen, toggleFavBreedRail, toggleBreedSearchForm } = useLayout();
    const [anchorEl, setAnchorEl] = useState(null);
    const { loggedIn, logout } = useLogin();
    const navigate = useNavigate();

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = async () => {
        await logout();
        navigate('/login');
};
    
    return (
        <>
        <AppBar position="fixed" ref={appBarRef} sx={{ zIndex: theme.zIndex.drawer + 1, width: '100vw' }}>
            <Toolbar>
                <IconButton color="inherit" onClick={toggleNav} edge="start">
                    <MenuIcon />
                </IconButton>
                <Box sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, width: `calc(100% - ${isNavOpen  || isFavBreedsRailOpen ? 240 : 0}px)` }}>
                    {/* Left Icons */}
                        <IconButton color="inherit">
                        <AccountBalanceWalletIcon />
                    </IconButton>
                        <IconButton color="inherit" onClick={toggleFavBreedRail} >
                        <PetsIcon />
                    </IconButton>
                        <IconButton
                            color="inherit"
                            onClick={toggleBreedSearchForm}
                        >
                        <SearchIcon />
                    </IconButton>
                </Box>

                {/* Right Section */}
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {loggedIn ? (
                        <>
                            <IconButton color="inherit" onClick={handleLogout}>
                                <ExitToAppIcon />
                            </IconButton>
                        </>
                    ) : (
                        <>
                            <IconButton color="inherit" component={Link} to='/signup'>
                                <PersonAddIcon />
                            </IconButton>
                            <IconButton color="inherit" component={Link} to='/login'>
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
        </>
    );
};

export default NewAppBar;