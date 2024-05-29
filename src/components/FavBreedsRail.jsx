import React, { useEffect } from 'react';
import { Box, Button, Drawer, Typography } from '@mui/material';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useLayout } from '../contexts/LayoutContext';
import { useTheme } from '@mui/material/styles';
import { useLogin } from '../contexts/LoginContext';
import { useNavigate } from 'react-router-dom';
import DroppableArea from './DroppableArea';
import DragBreedCard from './DragBreedCard';

const FavBreedsRail = () => {
    const { isFavBreedRailOpen, appBarHeight } = useLayout();
    const { userFavBreeds, setUserFavBreeds, myBreeds, setMyBreeds } = useDogSearch();
    const { loggedIn, token } = useLogin();
    const theme = useTheme();
    const navigate = useNavigate('/dogsearch');

    useEffect(() => {
        if (loggedIn) {
            const fetchDBUserFavBreeds = async () => {
                try {
                    const response = await fetch('http://localhost:5000/auth/getbreeds', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    setUserFavBreeds(data);
                } catch (error) {
                    console.error('Failed to fetch favorite breeds:', error);
                }
            };
            fetchDBUserFavBreeds();
        }
    }, [loggedIn, setUserFavBreeds, token]);

    const handleDrop = (item) => {
        console.log('Dropped item:', item);
        const draggedBreed = myBreeds.find(breed => breed.name === item.dog.name);

        if (!draggedBreed) {
            console.warn('Breed not found in myBreeds:', item.dog.name);
            return;
        }
        if (draggedBreed) {
            const updatedSearchBreeds = myBreeds.filter(breed => breed.name !== item.dog.name);
            setMyBreeds(updatedSearchBreeds);

            const updatedFavBreeds = [...userFavBreeds, {
                name: draggedBreed.name,
                img_url: draggedBreed.image_link,
            }];
            setUserFavBreeds(updatedFavBreeds);

            fetch('http://localhost:5000/auth/updatebreeds', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fav_breeds: updatedFavBreeds }),
                
            }).catch(error => console.error('Failed to update favorite breeds:', error));
        }
    };

    return (
        <Drawer
            variant="persistent"
            open={isFavBreedRailOpen}
            anchor="left"
            sx={{
                flexShrink: 0,
                width: '300px',
                '& .MuiDrawer-paper': {
                    boxSizing: 'border-box',
                    mt: `${appBarHeight}px`,
                    zIndex: theme.zIndex.drawer,
                    width: '360px',
                },
            }}
        >
            <Box sx={{ width: 300, padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Favorite Breeds
                </Typography>
                <DroppableArea id="userFavBreeds" onDrop={handleDrop}>
                    {userFavBreeds.length === 0 ? (
                        <Box
                            sx={{
                                border: '2px dashed grey',
                                borderRadius: '4px',
                                padding: '16px',
                                textAlign: 'center',
                            }}
                        >
                            Drag breeds here to add to your favorites
                        </Box>
                    ) : (
                        userFavBreeds.map((breed, index) => (
                            <DragBreedCard
                                key={breed.name}
                                id={`fav-${breed.name}`}
                                index={index}
                                dog={{ name: breed.name, image_link: breed.img_url }}
                            />
                        ))
                    )}
                </DroppableArea>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: '10px' }}
                    onClick={async () => {
                        try {
                            await fetch('http://localhost:5000/auth/updatebreeds', {
                                method: 'POST',
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({ fav_breeds: userFavBreeds }),
                            });
                            console.log('Favorite breeds updated');
                            setUserFavBreeds([]);

                        } catch (error) {
                            console.error('Failed to update favorite breeds:', error);
                        } 


                    }}
                >
                    Find My Dog!
                </Button>
            </Box>
        </Drawer>
    );
};

export default FavBreedsRail;