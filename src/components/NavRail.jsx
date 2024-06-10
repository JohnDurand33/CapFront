import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, ListItemButton, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PetsIcon from '@mui/icons-material/Pets';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import ThemeToggler from './ThemeToggleButton';
import { useLayout } from '../contexts/LayoutContext';
import { useLogin } from '../contexts/LoginContext';
import { useMediaQuery } from '@mui/material';

function NavRail({ mode, toggleMode, appBarHeight }) {
    const theme = useTheme();
    const { isNavOpen, setFavBreedRailOpen, setBreedSearchFormOpen, setNavOpen, screenType, sizeConfig, handleDoggyWallet, handleFavBreedRail } = useLayout();
    const { loggedIn, logout } = useLogin();

    const handleNewSearchRequest = () => {
        console.log('New Search Requested');
        setNavOpen(false)
        setBreedSearchFormOpen(true);
        setFavBreedRailOpen(true);
    };

    const handleLogout = async () => {
        await logout();
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
                transition="margin-left 0.3s ease-in-out"
                sx={{
                    flexShrink: 0,
                    width: sizeConfig.navRailWidth,
                    transition: 'margin-left 1.0s ease-in-out',
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        mt: `${appBarHeight}px`,
                        zIndex: theme.zIndex.drawer,
                        width: sizeConfig.navRailWidth,
                        transition: 'margin-left 0.2s ease-in-out',
                    }
                }}
            >
                <List>
                    {/* New Search */}
                    <ListItemButton onClick={handleNewSearchRequest}>
                        <ListItemIcon><SearchIcon /></ListItemIcon>
                        <ListItemText primary="New Search" />
                    </ListItemButton>

                    {/* DoggyWallet */}
                    <ListItemButton onClick={handleDoggyWallet} disabled={!loggedIn}>
                        <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
                        <ListItemText primary="DoggyWallet" />
                </ListItemButton>

                    {/* MyBreeds */}
                    <ListItemButton color="inherit" onClick={handleFavBreedRail} disabled={!loggedIn}>
                        <ListItemIcon><PetsIcon /></ListItemIcon>
                        <ListItemText primary="MyBreeds" />
                    </ListItemButton>
                </List>
                <Divider />
                <List>
                    {/* Sign Up */}
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
                        </>) : (
                    <ListItemButton onClick={handleLogout}>
                        <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                        <ListItemText primary="Sign Out" />
                        </ListItemButton>)}
                    <ListItemButton component={Link} to='/instructions'>
                        <ListItemIcon>
                            <HelpOutlineIcon /></ListItemIcon>
                    </ListItemButton >
                    <ListItem sx={{ml:-1}}>
                        <ThemeToggler mode={mode} toggleMode={toggleMode} />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}

export default NavRail;
