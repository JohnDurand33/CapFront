import React, { useEffect } from 'react';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { Box, Button, Drawer, Typography } from '@mui/material';
import BreedCard from './BreedCard';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useTheme } from '@mui/material/styles';
import { useLayout } from '../contexts/LayoutContext';
import { useLogin } from '../contexts/LoginContext';

const FavBreedsRail = ({ setMyBreeds, myBreeds }) => {
    const theme = useTheme();
    const { isFavBreedRailOpen, appBarHeight } = useLayout();
    const { userFavBreeds, setUserFavBreeds } = useDogSearch();
    const { loggedIn, token } = useLogin();

    useEffect(() => {
        console.log('FavBreedsRail: loggedIn status, token:', loggedIn, token);
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
                    console.log('Favorite breeds fetched:', data);
                } catch (error) {
                    console.error('Failed to fetch favorite breeds:', error);
                }
            };
            fetchDBUserFavBreeds();
        }
    }, [loggedIn, setUserFavBreeds, token]);

    const handleDrop = async (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId === destination.droppableId) {
            return;
        }

        try {
            if (destination.droppableId === "userFavBreeds") {
                const draggedBreed = myBreeds[source.index];
                const updatedSearchBreeds = Array.from(myBreeds);
                updatedSearchBreeds.splice(source.index, 1);
                setMyBreeds(updatedSearchBreeds);

                const updatedFavBreeds = Array.from(userFavBreeds);
                updatedFavBreeds.splice(destination.index, 0, draggedBreed);
                setUserFavBreeds(updatedFavBreeds);

                await fetch('http://localhost:5000/auth/updatebreeds', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ fav_breeds: updatedFavBreeds }),
                });
            }
        } catch (error) {
            console.error('Failed to update favorite breeds:', error);
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
                }
            }}
        >
            <Box sx={{ width: 300, padding: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Favorite Breeds
                </Typography>
                <DragDropContext onDragEnd={handleDrop}>
                    <Droppable droppableId="userFavBreeds">
                        {(provided) => (
                            <Box {...provided.droppableProps} ref={provided.innerRef}>
                                {userFavBreeds.map((breed, index) => (
                                    <Draggable key={breed.name} draggableId={breed.name} index={index}>
                                        {(provided) => (
                                            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                <BreedCard dog={{ name: breed.name, image_link: breed.img_url }} />
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </Box>
                        )}
                    </Droppable>
                </DragDropContext>
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