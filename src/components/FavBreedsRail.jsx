import React, { useEffect } from 'react';
import { Box, Button, Drawer, Typography } from '@mui/material';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useLayout } from '../contexts/LayoutContext';
import { useTheme } from '@mui/material/styles';
import { useLogin } from '../contexts/LoginContext';
import BreedCard from './BreedCard';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/ItemTypes';
import api from '../contexts/api';

const FavBreedsRail = () => {
    const { isFavBreedRailOpen, appBarHeight, setFavBreedRailOpen, sizeConfig } = useLayout();
    const { userFavBreeds, setUserFavBreeds, myBreeds, setMyBreeds } = useDogSearch();
    const { loggedIn } = useLogin();
    const theme = useTheme();

    useEffect(() => {
        if (loggedIn) {
            const fetchFavBreeds = async () => {
                try {
                    const response = await api.get('/api/getbreeds');
                    setUserFavBreeds(response.data);
                } catch (error) {
                    console.error('Failed to fetch favorite breeds:', error);
                }
            };
            fetchFavBreeds();
        }
    }, [loggedIn, setUserFavBreeds]);

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.BREED,
        drop: (item) => handleDrop(item, userFavBreeds, setUserFavBreeds, myBreeds, setMyBreeds),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <Drawer
            variant="persistent"
            open={isFavBreedRailOpen}
            anchor="left"
            sx={{
                alignItems: 'center',
                flexShrink: 0,
                width: sizeConfig.favBreedsRailWidth,
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    mt: `${appBarHeight}px`,
                    zIndex: theme.zIndex.drawer,
                    width: sizeConfig.favBreedsRailWidth,
                },
            }}
        >
            <Box ref={drop} sx={{ pt: 11, display: "flex", flexDirection: "column", alignItems: 'center', backgroundColor: isOver ? 'lightgreen' : 'white' }}>
                <Typography variant="h6" gutterBottom textAlign='center'>
                    Favorite Breeds
                </Typography>
                <Box
                    sx={{
                        padding: 8,
                        width: '100%',
                    }}
                >
                    {userFavBreeds.length === 0 ? (
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
                            Drag breeds here to add to your favorites
                        </Box>
                    ) : (
                        userFavBreeds.map((breed, index) => (
                            <Box key={breed.id} sx={{ mb: 2 }}>
                                <BreedCard
                                    sx={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}
                                    id={`fav-${breed.id}`}
                                    breed={breed}
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
                    onClick={() => setFavBreedRailOpen(false)}
                >
                    Close Rail
                </Button>
            </Box>
        </Drawer>
    );
};

const handleDrop = async (item, userFavBreeds, setUserFavBreeds, myBreeds, setMyBreeds) => {
    const draggedBreed = myBreeds.find(breed => breed.name === item.breed.name);

    if (!draggedBreed) {
        console.warn(`Breed not found in myBreeds:`, item.breed.name);
        return;
    }

    setMyBreeds(prevMyBreeds => prevMyBreeds.filter(breed => breed.name !== item.breed.name));

    const updatedUserFavBreeds = [...userFavBreeds, draggedBreed];
    setUserFavBreeds(prevUserFavBreeds => {
        const updadedUserFavBreeds = [...prevUserFavBreeds, draggedBreed];

        try {
            api.post('/api/updatebreeds', { fav_breeds: updatedUserFavBreeds });
            console.log('Favorite breeds updated successfully');
        } catch (error) {
            console.error('Failed to update favorite breeds:', error);
        }
    });
};

export default FavBreedsRail;