import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, ListItemButton, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PetsIcon from '@mui/icons-material/Pets';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ThemeToggler from './ThemeToggleButton';
import { useLayout } from '../contexts/LayoutContext';
import { useLogin } from '../contexts/LoginContext';

function NavRail({ mode, toggleMode, appBarHeight }) {
    const theme = useTheme();
    const { isNavOpen, toggleDogSearch } = useLayout();
    const { loggedIn, logout } = useLogin();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <>
            <Drawer
                variant="persistent"
                open={isNavOpen}
                anchor="left"
                transition="margin-left 1.0s ease-in-out"
                sx={{
                    flexShrink: 0,
                    width: isNavOpen ? '240px' : 0,
                    transition: 'margin-left 1.0s ease-in-out',
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        mt: `${appBarHeight}px`,
                        zIndex: theme.zIndex.drawer,
                        transition: 'margin-left 0.2s ease-in-out',
                    }
                }}
            >
                <List>
                    {/* New Search */}
                    <ListItemButton onClick={toggleDogSearch}>
                        <ListItemIcon><Link to="#"><SearchIcon /></Link></ListItemIcon>
                        <ListItemText primary="New Search" />
                    </ListItemButton>

                    {/* DoggyWallet */}
                    <ListItem onClick={() => alert('Navigate to DoggyWallet')}>
                        <ListItemIcon><AccountBalanceWalletIcon /></ListItemIcon>
                        <ListItemText primary="DoggyWallet" />
                    </ListItem>

                    {/* MyBreeds */}
                    <ListItem onClick={() => alert('Navigate to MyBreeds')}>
                        <ListItemIcon><PetsIcon /></ListItemIcon>
                        <ListItemText primary="MyBreeds" />
                    </ListItem>
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
                    <ListItem>
                        <ThemeToggler mode={mode} toggleMode={toggleMode} />
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
}

export default NavRail;
