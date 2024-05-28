import React, { useEffect } from 'react';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import { Box, Button } from '@mui/material';
import BreedCard from './BreedCard';
import apiCall from '../utils/apiCall';  // Adjust the import path as necessary
import { useDogSearch } from '../contexts/DogSearchContext';

const FavBreedsRail = ({ setMyBreeds, myBreeds }) => {
    const { userFavBreeds, setUserFavBreeds } = useDogSearch();

    useEffect(() => {
        const fetchDBUserFavBreeds = async () => {
            try {
                const response = await apiCall.get('/fav-breeds');
                setUserFavBreeds(response.data);  // Directly set the array of objects
            } catch (error) {
                console.error('Failed to fetch favorite breeds:', error);
            }
        };
        fetchDBUserFavBreeds();
    }, [setUserFavBreeds]);

    const handleDrop = async (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        // If the source and destination are the same, return early
        if (source.droppableId === destination.droppableId) {
            return;
        }

        try {
            // Moving from BreedSearchView to FavBreedsRail
            if (destination.droppableId === "userFavBreeds") {
                const draggedBreed = myBreeds[source.index];

                // Remove the breed from the search breeds
                const updatedSearchBreeds = Array.from(myBreeds);
                updatedSearchBreeds.splice(source.index, 1);
                setMyBreeds(updatedSearchBreeds);

                // Add the breed to favorite breeds
                const updatedFavBreeds = Array.from(userFavBreeds);
                // Using splice to insert at the specific position where it was dropped
                updatedFavBreeds.splice(destination.index, 0, draggedBreed);
                setUserFavBreeds(updatedFavBreeds);

                // Optionally, you can update the backend immediately after the change
                await apiCall.post('/fav-breeds', { fav_breeds: updatedFavBreeds });
            }
        } catch (error) {
            console.error('Failed to update favorite breeds:', error);
        }
    };

    return (
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
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '10px' }}
                onClick={async () => {
                    try {
                        await apiCall.post('/fav-breeds', { fav_breeds: userFavBreeds });
                        console.log('Favorite breeds updated');
                    } catch (error) {
                        console.error('Failed to update favorite breeds:', error);
                    }
                }}
            >
                Find My Dog!
            </Button>
        </DragDropContext>
    );
};

export default FavBreedsRail;