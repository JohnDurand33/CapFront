import React from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, ListItemButton, useTheme, Tooltip } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PetsIcon from '@mui/icons-material/Pets';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import HomeIcon from '@mui/icons-material/Home';
import ThemeToggler from './ThemeToggleButton';
import { useLayout } from '../contexts/LayoutContext';
import { useLogin } from '../contexts/LoginContext';
import { useDogSearch } from '../contexts/DogSearchContext';
import BrandLogo from '../static/Brand.png';

function NavRail({ mode, toggleMode, appBarHeight }) {
    const theme = useTheme();
    const { myBreeds } = useDogSearch();
    const { isNavOpen, setFavBreedRailOpen, setBreedSearchFormOpen, setNavOpen, screenType, sizeConfig, handleDoggyWallet, handleFavBreedRail, handleHome } = useLayout();
    const { loggedIn, logout } = useLogin();
    const location = useLocation();

    const handleNewSearchRequest = () => {
        console.log('New Search Requested');
        setNavOpen(false);
        setBreedSearchFormOpen(true);
        if (myBreeds && myBreeds.length > 0) {
            setFavBreedRailOpen(true);
        }
    };

    const handleLogout = async () => {
        await logout();
        setNavOpen(false);
    };

    if (screenType === 'phone') {
        return null;
    }

    return (
        <>
            <Drawer
                variant="persistent"
                open={isNavOpen}
                anchor="left"
                sx={{
                    flexShrink: 0,
                    width: sizeConfig.navRailWidth,
                    backgroundColor: theme.palette.customGrey.main,
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        mt: `${appBarHeight}px`,
                        zIndex: theme.zIndex.drawer,
                        width: sizeConfig.navRailWidth,
                        transition: 'margin-left 0.5s ease-in-out, background-color 0.5s ease-in-out',
                        backgroundColor: theme.palette.customGrey.main,
                    },
                }}
            >
                <List>
                    <ListItemButton
                        color="inherit"
                        onClick={handleHome}
                        component={Link}
                        to='/home'
                    >
                        <ListItemIcon>
                            <HomeIcon />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </ListItemButton>
                    <Tooltip title={!loggedIn ? 'Sign Up for Free Access' : ''}>
                        <span>
                            <ListItemButton onClick={handleNewSearchRequest} disabled={!loggedIn}>
                        <ListItemIcon><SearchIcon /></ListItemIcon>
                        <ListItemText primary="New Search" />
                    </ListItemButton>
                        </span>
                    </Tooltip>
                    <Tooltip title={!loggedIn ? 'Sign Up for Free Access' : ''}>
                        <span>
                            <ListItemButton onClick={handleDoggyWallet} disabled={!loggedIn}>
                                <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
                                <ListItemText primary="DoggyWallet" />
                            </ListItemButton>
                        </span>
                    </Tooltip>
                    <Tooltip title={!loggedIn ? 'Sign Up for Free Access' : ''}>
                        <span>
                            <ListItemButton color="inherit" onClick={handleFavBreedRail} disabled={!loggedIn}>
                                <ListItemIcon><PetsIcon /></ListItemIcon>
                                <ListItemText primary="MyBreeds" />
                            </ListItemButton>
                        </span>
                    </Tooltip>
                </List>
                <Divider />
                <List>
                    {!loggedIn ? (
                        <>
                            <ListItemButton component={Link} to='/signup'>
                                <ListItemIcon><PersonAddIcon /></ListItemIcon>
                                <ListItemText primary="Sign Up" />
                            </ListItemButton>
                            <ListItemButton component={Link} to='/login'>
                                <ListItemIcon><VpnKeyIcon /></ListItemIcon>
                                <ListItemText primary="Sign In" />
                            </ListItemButton>
                        </>
                    ) : (
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                            <ListItemText primary="Sign Out" />
                        </ListItemButton>
                    )}
                    <ListItemButton component={Link} to='/instructions'>
                        <ListItemIcon>
                            <HelpOutlineIcon />
                        </ListItemIcon>
                        <ListItemText primary="Help" />
                    </ListItemButton>
                    <ListItem sx={{ ml: -1 }}>
                        <ThemeToggler mode={mode} toggleMode={toggleMode} />
                    </ListItem>
                </List>
                <img src={BrandLogo} alt="Brand" />
            </Drawer>
        </>
    );
}

export default NavRail;