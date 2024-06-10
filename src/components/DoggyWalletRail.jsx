import React, { useEffect } from 'react';
import { Box, Button, Drawer, Typography } from '@mui/material';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useLayout } from '../contexts/LayoutContext';
import { useLogin } from '../contexts/LoginContext';
import { useTheme } from '@mui/material/styles';
import DroppableArea from './DroppableArea';
import DragDogSearchCard from './DragDogSearchCard';
import DragDoggyWalletCard from './DragDoggyWalletCard';
import api from '../contexts/api';

const DoggyWalletRail = () => {
    const { isFavBreedRailOpen, isDoggyWalletOpen, appBarHeight, sizeConfig } = useLayout();
    const { loggedIn } = useLogin();
    const { userFavDogs, setUserFavDogs, myDogs, setMyDogs, homeDogs, setHomeDogs } = useDogSearch();
    const theme = useTheme();

    useEffect(() => {
        if (loggedIn) {
            const fetchUserFavDogs = async () => {
                try {
                    const response = await api.get('/api/get_favdogs');
                    console.log('GET /api/get_favdogs response:', response.data);
                    setUserFavDogs(response.data);
                } catch (error) {
                    console.error('Failed to fetch favorite dogs:', error);
                }
            };
            fetchUserFavDogs();
        }
    }, [setUserFavDogs]);

    const handleDrop = async (item) => {
        console.log('Dropped item:', item);
        let draggedDog = homeDogs.find(dog => dog.api_id === item.dog.api_id) || myDogs.find(dog => dog.api_id === item.dog.api_id);

        if (!draggedDog) {
            console.warn('Dog not found in homeDogs or myDogs:', item.dog.api_id);
            return;
        }

        const updatedHomeDogs = homeDogs.filter(dog => dog.api_id !== item.dog.api_id);
        setHomeDogs(updatedHomeDogs);

        const updatedMyDogs = myDogs.filter(dog => dog.api_id !== item.dog.api_id);
        setMyDogs(updatedMyDogs);

        const updatedFavDogs = [...userFavDogs, draggedDog];
        setUserFavDogs(updatedFavDogs);

        try {
            const response = await api.post('/api/add_favdog', {
                dog_id: draggedDog.api_id,
            });
            console.log('Dog added to favorites successfully:', response.data);
        } catch (error) {
            console.error('Error adding dog to favorites:', error.response ? error.response.data : error.message);
        }
    };

    const handleClearFavDogs = async () => {
        const response = await api.delete('/api/clear_fav_dogs');
        if (response.status === 200) {
            console.log('Favorite dogs cleared successfully');
            setUserFavDogs([]);
        } else {
            console.error('Failed to clear favorite dogs:', response.statusText);
        }
    };
        
        


    return (
        <Drawer
            variant="persistent"
            open={isDoggyWalletOpen}
            anchor="left"
            sx={{
                alignItems: 'center',
                flexShrink: 0,
                width: sizeConfig.doggyWalletRailWidth,
                p:5,
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    mt: `${appBarHeight}px`,
                    zIndex: theme.zIndex.drawer,
                    width: sizeConfig.doggyWalletRailWidth,
                    p:5
                },
            }}
        >
            <Box sx={{ width: "100%", alignSelf: 'center', pt: 11, display: "flex", flexDirection: "column", alignItems: 'center' }}>
                <Typography variant="h6" gutterBottom>
                    DOGGY WALLET
                </Typography>
                <DroppableArea id="userFavDogs" onDrop={handleDrop} acceptType='dog'>
                    {userFavDogs.length === 0 ? (
                        <Box
                            sx={{
                                border: '2px dashed grey',
                                borderRadius: '4px',
                                padding: '16px',
                                textAlign: 'center',
                                backgroundColor: theme.palette.background.paper,
                                color: theme.palette.text.primary
                            }}
                        >
                            Drag dogs here to add to your favorites
                        </Box>
                    ) : (
                        userFavDogs.map((dog, index) => (
                            <DragDoggyWalletCard
                                sx={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary, maxWidth: sizeConfig.getMaxCardWidth(isFavBreedRailOpen, isDoggyWalletOpen) }}
                                key={`${dog.api_id}-${index}`} // Ensure unique key
                                id={`fav-${dog.api_id}`}
                                index={index}
                                dog={dog}
                            />
                        ))
                    )}
                </DroppableArea>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: '10px', width: '70%'}}
                    onClick={handleClearFavDogs}
                >
                    Clear my Favorites List!
                </Button>
            </Box>
        </Drawer>
    );
};

export default DoggyWalletRail;