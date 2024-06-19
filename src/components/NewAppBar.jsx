import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Box, Menu, MenuItem, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PetsIcon from '@mui/icons-material/Pets';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ThemeToggleButton from './ThemeToggleButton';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { useLayout } from '../contexts/LayoutContext';
import { useLogin } from '../contexts/LoginContext';
import { useTheme } from '@mui/material';
import { useDogSearch } from '../contexts/DogSearchContext';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import BrandLogo from '../static/Brand.png';


const NewAppBar = ({ appBarRef, toggleMode, mode }) => {
    const { handleNavToggle, isBreedSearchFormOpen, setBreedSearchFormOpen, handleFavBreedRail, handleDoggyWallet, setNavOpen, setFavBreedRailOpen, setDoggyWalletOpen, screenType, sizeConfig, handleHome, handleBreedSearchForm } = useLayout();
    const {userFavBreeds} = useDogSearch();
    const { loggedIn, logout } = useLogin();
    const navigate = useNavigate();
    const theme = useTheme();

    const handleLogout = async () => {
        await logout();
        setNavOpen(false);
    };

    const handleDisabledClick = () => {
        if (!loggedIn) {
            alert('Please Sign Up for Free to Access This Feature');
        }
    };
    
    return (
        <>
        <AppBar position="fixed" ref={appBarRef} sx={{ zIndex: theme.zIndex.drawer + 1, width: '100vw' }}>
            <Toolbar sx={{ml:2}}>
                    {screenType !== 'phone' && <IconButton color="inherit" onClick={handleNavToggle} edge="start" >
                        <MenuIcon />
                    </IconButton>}
                    <Box sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, width: `calc(100% - 0px)` }}>
                        <Tooltip title={!loggedIn ? 'Sign Up for Free Access' : ''}>
                            <span>
                        <IconButton color="inherit" onClick={handleDoggyWallet} disabled={!loggedIn}>
                        <AccountBalanceWalletIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        <Tooltip title={!loggedIn ? 'Sign Up for Free Access' : ''}>
                            <span>
                        <IconButton color="inherit" onClick={handleFavBreedRail} disabled={!loggedIn}>
                        <PetsIcon />
                                </IconButton>
                            </span>
                        </Tooltip>
                        
                        <Tooltip title={!loggedIn ? 'Sign Up for Free Access' : ''}>
                            <span>
                        <IconButton color="inherit" onClick={handleBreedSearchForm} disabled={!loggedIn}>
                                    <SearchIcon />
                                    
                                </IconButton>
                            </span>
                            </Tooltip>
                        <IconButton
                            color="inherit"
                            component={Link} to='/home'
                        >
                            <HomeIcon />
                        </IconButton>
                </Box>
                    <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', height: '100%', display: 'flex', alignItems: 'center' }}>
                        <img src={BrandLogo} alt="Brand" style={{ height: '80%', width: 'auto', pointerEvents: 'none' }} />
                    </Box>

                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {loggedIn ? (
                        <>
                                <IconButton color="inherit" onClick={handleLogout} disabled={!loggedIn}>
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

                    <ThemeToggleButton toggleMode={toggleMode} mode={mode} />
                        <IconButton color="inherit" onClick={() => navigate('/instructions')}>
                            <HelpOutlineIcon />
                    </IconButton>
                </Box>
            </Toolbar>
            </AppBar>
        </>
    );
};

export default NewAppBar;