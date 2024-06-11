import React, { useEffect } from 'react';
import { Box, Button, Drawer, Typography } from '@mui/material';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useLayout } from '../contexts/LayoutContext';
import { useTheme } from '@mui/material/styles';
import { useLogin } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import DroppableArea from './DroppableArea';
import DragBreedCard from './DragBreedCard';
import api from '../contexts/api';

const FavBreedsRail = () => {
    const { isFavBreedRailOpen, appBarHeight, setFavBreedRailOpen, setNavOpen, setDoggyWalletOpen, sizeConfig, handleHome } = useLayout();
    const { userFavBreeds, setUserFavBreeds, myBreeds, setMyBreeds, myDogs, setMyDogs } = useDogSearch();
    const { loggedIn, token } = useLogin();
    const theme = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            const fetchDBUserFavBreeds = async () => {
                try {
                    const response = await api.get('/api/getbreeds');
                    console.log('GET response:', response.data);
                    setUserFavBreeds(response.data);
                    console.log('Favorite breeds fetched from user\'s database with api:', response.data);
                } catch (error) {
                    console.error('Failed to fetch favorite breeds:', error);
                }
            };
            fetchDBUserFavBreeds();
        }
    }, [loggedIn, setUserFavBreeds, setFavBreedRailOpen]);

    const handleDrop = async (item) => {

        console.log('Dropped item:', item);
        const draggedBreed = myBreeds.find(breed => breed.name === item.breed.name);

        if (!draggedBreed) {
            console.warn('Breed not found in myBreeds:', item.breed.name);
            return;
        }

        const updatedSearchBreeds = myBreeds.filter(breed => breed.name !== item.breed.name);
        setMyBreeds(updatedSearchBreeds);

        const updatedFavBreeds = [...userFavBreeds, draggedBreed];
        setUserFavBreeds(updatedFavBreeds);

        try {
            const response = await api.post('/api/updatebreeds', {
                fav_breeds: updatedFavBreeds
            });
            console.log('Favorite breeds updated successfully:', response.data);
        } catch (error) {
            console.error('Error updating favorite breeds:', error.response ? error.response.data : error.message);
        }
    };

    const handleFindMyDog = async () => {
        try {
            const response = await api.post('/api/find_dogs', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                method:'POST',
                body: JSON.stringify({ fav_breeds: userFavBreeds }),
            });
            console.log('Matched dogs:', response.data);
            setNavOpen(false);
            setFavBreedRailOpen(false);
            setDoggyWalletOpen(true);
            setMyDogs(response.data);
            navigate('/dogsearch', { state: { myDogs: response.data } });
        } catch (error) {
            console.error('Failed to fetch matched dogs:', error);
        }
    };

    const handleClearFavBreeds = async () => {
        try {
            const response = await api.delete('api/clearbreeds');
            console.log('Favorite breeds cleared successfully');
            setUserFavBreeds([]);
        } catch (error) { console.error('Failed to clear favorite breeds:', error); }
    };

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
            <Box sx={{ pt: 11, display: "flex", flexDirection: "column", alignItems: 'center' }}>
                <Typography variant="h6" gutterBottom textAlign='center'>
                    Favorite Breeds
                </Typography>
                <DroppableArea id="userFavBreeds" onDrop={handleDrop} acceptType='breed'>
                    {!loggedIn ? (<Box
                        sx={{
                            border: '2px dashed grey',
                            borderRadius: '4px',
                            padding: '16px',
                            textAlign: 'center',
                            backgroundColor: theme.palette.background.paper,
                            color: theme.palette.text.primary
                        }}
                    >
                        Sign Up or Sign In To Use this Feature!
                    </Box>) : userFavBreeds.length === 0 ? (
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
                            <Box key={`${breed.name}-${index}`} sx={{ mb: 2 }}>
                                <DragBreedCard
                                    sx={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}
                                    id={`fav-${breed.name}`}
                                    index={index}
                                    breed={breed}
                                />
                            </Box>
                        ))
                    )}
                </DroppableArea>
                <Button
                    variant="contained"
                    color="primary"
                    sx={{ marginTop: '10px' }}
                    onClick={handleFindMyDog}
                >
                    Find My Dog!
                </Button >
                {userFavBreeds.length > 0 && (
                    <Button variant="outlined"
                        color="secondary"
                        sx={{
                            marginTop: "20px"
                        }}
                        onClick={handleClearFavBreeds}
                    >
                        Clear my Favorite Breeds List!
                    </Button>)}
            </Box>
        </Drawer>
    );
};

export default FavBreedsRail;