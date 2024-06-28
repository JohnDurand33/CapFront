import { useEffect } from 'react';
import { useLayout } from '../contexts/LayoutContext';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import '../styles/index.css';

const Instructions = () => {

    const { setNavOpen } = useLayout();

    useEffect(() => {
        setNavOpen(true)
    }, [])

    return (
        <Box sx={{ padding: 3, mt: "5%" }}>
            <Typography variant="h4" gutterBottom>
                How to Find Your Perfect Dog
            </Typography>
            <List>
                <ListItem>
                    <ListItemText primary="1. Sign Up / Log In" secondary="Create an account or log in to access all features." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="2. Search for Breeds" secondary="Click the 'New Search' Magnifying Glass icon to find dogs that match your preferences." />
                </ListItem>
                <ListItem>
                    <ListItemText primary="3. Favorite Breeds" secondary={
                        <>
                            <Typography variant="body2" display="block" sx={{ fontWeight: 'fontWeightRegular' }}>
                                Drag breeds you like into the Favorite Breeds siderail to save new preferences.
                            </Typography>
                            <Typography variant="body2" display="block" sx={{ fontWeight: 'fontWeightRegular' }}>
                                Click on the "MyBreeds" Paw Icon at the top of the page to view your saved Breeds.
                            </Typography>
                        </>
                    } />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="4. Find Matching Dogs" secondary="Click the 'Find My Dog!' button to search for dogs that match your favorite breeds." />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="5. Favorite Dogs" secondary={
                        <>
                            <Typography variant="body2" display="block" sx={{ fontWeight: 'fontWeightRegular' }}>
                            Drag any of the actual, adoptable dogs you like into the Doggy Wallet siderail to save them.
                        </Typography>
                            <Typography variant="body2" display="block" sx={{ fontWeight: 'fontWeightRegular' }}>
                            Click on the "DoggyWallet" Wallet Icon to view your potential adoptions!
                            </Typography>
                        </>
                    } />
                    </ListItem>

                    <ListItem>
                        <ListItemText primary="6. Contact Adoption Agencies" secondary="Click the 'Contact Adoption Agency' button on a dog's card to inquire about adoption." />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="7. Save your Progress" secondary="When you come back, all your breed preferences and potential future pets will remain for you to choose!." />
                    </ListItem>
            </List>
        </Box>
    );
};

export default Instructions;