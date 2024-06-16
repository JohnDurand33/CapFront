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

const FavDogsRail = () => {
    const { isDoggyWalletOpen, appBarHeight, setDoggyWalletOpen, sizeConfig } = useLayout();
    const { userFavDogs, setUserFavDogs, homeDogs, setHomeDogs } = useDogSearch();
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
        drop: (item) => handleDrop(item, userFavDogs, setUserFavDogs, homeDogs, setHomeDogs),
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
                width: sizeConfig.favDogsRailWidth,
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    mt: `${appBarHeight}px`,
                    zIndex: theme.zIndex.drawer,
                    width: sizeConfig.favDogsRailWidth,
                },
            }}
        >
            <Box ref={drop} sx={{ pt: 11, display: "flex", flexDirection: "column", alignItems: 'center', backgroundColor: isOver ? 'lightblue' : 'white' }}>
                <Typography variant="h6" gutterBottom textAlign='center'>
                    Favorite Dogs
                </Typography>
                <Box
                    sx={{
                        padding: 8,
                        width: '100%',
                    }}
                >
                    {userFavDogs.length === 0 ? (
                        <Box
                            sx={{
                                ml: '10%',
                                width: '80%',
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
                            <Box key={dog.api_id} sx={{ mb: 2 }}>
                                <DogCard
                                    sx={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}
                                    id={`fav-${dog.api_id}`}
                                    dog={dog}
                                    index={index}
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
            </Box>
        </Drawer>
    );
};

const handleDrop = async (item, userFavDogs, setUserFavDogs, homeDogs, setHomeDogs) => {
    const draggedDog = homeDogs.find(dog => dog.api_id === item.api_id);

    if (!draggedDog) {
        console.warn(`Dog not found in homeDogs:`, item.name);
        return;
    }

    const updatedHomeDogs = homeDogs.filter(dog => dog.api_id !== item.api_id);
    setHomeDogs(updatedHomeDogs);

    const updatedUserFavDogs = [...userFavDogs, draggedDog];
    setUserFavDogs(updatedUserFavDogs);

    try {
        console.log('Adding FavDog:', draggedDog.api_id);
        await api.post('/api/add_favdog', { dog_id: draggedDog.api_id });
        console.log('FavDog added successfully');
    } catch (error) {
        console.error('Failed to add FavDog:', error);
    }
};

export default FavDogsRail;