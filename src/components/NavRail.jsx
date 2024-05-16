import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider, ListItemButton } from '@mui/material';
import { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PetsIcon from '@mui/icons-material/Pets';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ThemeToggler from './ThemeToggler';
import { useTheme } from '../contexts/ThemeContext';
import { useLayout } from '../contexts/LayoutContext';

function NavRail() {
    const { theme } = useTheme();
    const { isNavOpen } = useLayout();

    return (
        <>
        <Drawer
            variant="persistent"
            open={isNavOpen}
            anchor="left"
            transition= "margin-left 1.0s ease-in-out"
            sx={{
                flexShrink: 0,
                width: isNavOpen ? 240 : 0,
                transition: 'margin-left 1.0s ease-in-out',
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    marginTop: `64px`,
                    zIndex: theme.zIndex.drawer,
                    transition: 'margin-left 1.0s ease-in-out',
                }
            }}
        >
            <List>
                {/* New Search */}
                <ListItem onClick={() => alert('Open modal for New Search')}>
                    <ListItemIcon><SearchIcon /></ListItemIcon>
                    <ListItemText primary="New Search" />
                </ListItem>

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
                <ListItemButton component={Link} to='/signup'>
                    <ListItemIcon><PersonAddIcon /></ListItemIcon>
                    <ListItemText primary="Sign Up" />
                </ListItemButton>

                {/* Sign In */}
                <ListItem onClick={() => alert('Navigate to Sign In')}>
                    <ListItemIcon><VpnKeyIcon /></ListItemIcon>
                    <ListItemText primary="Sign In" />
                </ListItem>

                {/* Sign Out */}
                <ListItem onClick={() => alert('Navigate to Sign Out')}>
                    <ListItemIcon><ExitToAppIcon /></ListItemIcon>
                    <ListItemText primary="Sign Out" />
                </ListItem>
                <ListItem>
                    <ThemeToggler />
                </ListItem>
            </List>
            </Drawer>
        </>
    );
}

export default NavRail;
