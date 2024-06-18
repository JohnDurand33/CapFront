import React, { useEffect } from 'react';
import { Box, Button, Drawer, Typography } from '@mui/material';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useLayout } from '../contexts/LayoutContext';
import { useTheme } from '@mui/material/styles';
import { useLogin } from '../contexts/LoginContext';
import DogCard from './DogCard';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/ItemTypes';
import api from '../contexts/api';

const DoggyWalletRail = () => {
    const { isDoggyWalletOpen, appBarHeight, sizeConfig, setDoggyWalletOpen } = useLayout();
    const { userFavDogs, setUserFavDogs, myDogs, setMyDogs } = useDogSearch();
    const { loggedIn } = useLogin();
    const theme = useTheme();

    useEffect(() => {
        if (loggedIn) {
            const fetchFavDogs = async () => {
                try {
                    const response = await api.get('/api/get_favdogs');
                    setUserFavDogs(response.data);
                } catch (error) {
                    console.error('Failed to fetch favorite dogs:', error);
                }
            };
            fetchFavDogs();
        }
    }, [loggedIn, setUserFavDogs]);

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.DOG,
        drop: (item) => handleDrop(item, userFavDogs, setUserFavDogs, myDogs, setMyDogs),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <Drawer
            variant="persistent"
            open={isDoggyWalletOpen}
            anchor="left"
            sx={{
                alignItems: 'center',
                flexShrink: 0,
                width: sizeConfig.doggyWalletRailWidth,
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    mt: `${appBarHeight}px`,
                    zIndex: theme.zIndex.drawer,
                    width: sizeConfig.doggyWalletRailWidth,
                    backgroundColor: isOver ? '#aca9a9' : theme.palette.background.default, // Use '#aca9a9' for hover color
                    transition: 'margin-left 0.5s ease-in-out, background-color 0.5s ease-in-out',
                },
            }}
        >
            <Box ref={drop} sx={{ pt: 11, display: "flex", flexDirection: "column", alignItems: 'center', backgroundColor: isOver ? '#aca9a9' : theme.palette.background.default }}>
                <Typography variant="h6" gutterBottom textAlign='center' sx={{ color: theme.palette.text.primary }}>
                    Favorite Dogs
                </Typography>
                <Box
                    sx={{
                        padding: 2,
                        width: '100%',
                    }}
                >
                    {userFavDogs.length === 0 ? (
                        <Box
                            sx={{
                                ml: '10%',
                                width: '80%',
                                border: `2px dashed ${theme.palette.divider}`,
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
                        userFavDogs.map((dog) => (
                            <Box key={dog.api_id} sx={{ mb: 2 }}>
                                <DogCard
                                    sx={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}
                                    id={`fav-${dog.api_id}`}
                                    dog={dog}
                                />
                            </Box>
                        ))
                    )}
                </Box>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: '10px' }}
                    onClick={() => setDoggyWalletOpen(false)}
                >
                    Close Rail
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: '10px' }}
                    onClick={handleClearDogs}
                >
                    Close Rail
                </Button>
            </Box>
        </Drawer>
    );
};

const handleDrop = async (item, userFavDogs, setUserFavDogs, myDogs, setMyDogs) => {
    const draggedDog = myDogs.find(dog => dog.api_id === item.dog.api_id);

    if (!draggedDog) {
        console.warn(`Dog not found in myDogs:`, item.dog.name);
        return;
    }

    const updatedMyDogs = myDogs.filter(dog => dog.api_id !== item.dog.api_id);
    setMyDogs(updatedMyDogs);

    const updatedUserFavDogs = [...userFavDogs, draggedDog];
    setUserFavDogs(updatedUserFavDogs);

    try {
        await api.post('/api/add_favdog', { dog_id: draggedDog.api_id });
        console.log('FavDog added successfully');
    } catch (error) {
        console.error('Failed to add FavDog:', error);
    }
};

const handleClearDogs = async () => {
    try {
        await api.post('/api/clear_fav_dogs');
        console.log('userFavDogs cleared successfully');
    } catch (error) {
        console.error('Failed to clear FavDogs:', error);
    }
}

export default DoggyWalletRail;