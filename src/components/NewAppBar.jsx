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
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import { useLayout } from '../contexts/LayoutContext';
import { useLogin } from '../contexts/LoginContext';
import { useTheme } from '@mui/material';
import { useDogSearch } from '../contexts/DogSearchContext';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';


const NewAppBar = ({ appBarRef, toggleMode, mode }) => {
    const { handleNavToggle, isBreedSearchFormOpen, setBreedSearchFormOpen, handleFavBreedRail, handleDoggyWallet, setNavOpen, setFavBreedRailOpen, setDoggyWalletOpen , } = useLayout();
    const {userFavBreeds} = useDogSearch();

    const { loggedIn, logout } = useLogin();
    const navigate = useNavigate();
    const theme = useTheme();

    const handleBreedSearchForm = () => {
        if (isBreedSearchFormOpen) {
            setBreedSearchFormOpen(false);
            return;
        } else {
            setBreedSearchFormOpen(true);
            setNavOpen(true);
            setFavBreedRailOpen(false)
            setDoggyWalletOpen(false);
        }
    };

    const handleLogout = async () => {
        await logout();
        navigate('/home');
    };


    
    return (
        <>
        <AppBar position="fixed" ref={appBarRef} sx={{ zIndex: theme.zIndex.drawer + 1, width: '100vw' }}>
            <Toolbar sx={{ml:2}}>
                <IconButton color="inherit" onClick={handleNavToggle} edge="start" >
                    <MenuIcon />
                </IconButton>
                <Box sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, width: `calc(100% - 0px)` }}>

                        <IconButton color="inherit" onClick={handleDoggyWallet} disabled={!loggedIn}>
                        <AccountBalanceWalletIcon />
                    </IconButton>
                        <IconButton color="inherit" onClick={handleFavBreedRail} disabled={!loggedIn}>
                        <PetsIcon />
                    </IconButton>
                        <IconButton
                            color="inherit"
                            onClick={handleBreedSearchForm}
                        >
                        <SearchIcon />
                        </IconButton>
                        <IconButton
                            color="inherit"
                            component={Link} to='/home'
                        >
                            <HomeIcon />
                        </IconButton>
                </Box>


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