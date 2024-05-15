import { Drawer, List, ListItem, ListItemIcon, ListItemText, Divider} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PetsIcon from '@mui/icons-material/Pets';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ThemeToggler from './ThemeToggler';
import { useTheme } from '../contexts/ThemeContext';

function NavigationRail() {
    const { mode, toggleTheme, theme } = useTheme();
    

    return (
        <Drawer
            variant="permanent"
            anchor="left"
            sx={{
                width: 240, flexShrink: 0, '& .MuiDrawer-paper': {
                    boxSizing: 'border-box', marginTop: '64px', zIndex: 0
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
                <ListItem onClick={() => alert('Navigate to Sign Up')}>
                    <ListItemIcon><PersonAddIcon /></ListItemIcon>
                    <ListItemText primary="Sign Up" />
                </ListItem>

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
    );
}

export default NavigationRail;
// Explanation:
// Drawer Component: Acts as the container for the Navigation Rail.
// List and ListItem: Used to create clickable items within the Drawer.
//     Icons: Each ListItem is equipped to have an icon that represents its purpose.For example, SearchIcon for "New Search," AccountBalanceWalletIcon for "DoggyWallet," and PetsIcon for "MyBreeds."
// Action Handlers: I added placeholder onClick events that you can replace with actual navigation logic or modal display functions as needed in your application.
//     Integration:
// To use the NavigationRail component, simply import it into your application's main component or wherever you manage your layout:

