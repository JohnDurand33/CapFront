import React, { useEffect, useState } from 'react';
import { Droppable, Draggable, DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import { Box, Button, Typography } from '@mui/material';
import BreedCard from './BreedCard';

const FavBreedsRail = ({ setMyBreeds, yBreeds }) => {
    useEffect(() => {
        const fetchDBFavBreeds = async () => {
            try {
                const response = await axios.get('/api/fav-breeds');
                const breeds = response.data.reduce((acc, breed) => {
                    acc[breed.name] = breed.image_url;
                    return acc;
                }, {});
                setMyBreeds(breeds);
            } catch (error) {
                console.error('Failed to fetch favorite breeds:', error);
            }
        };
        fetchDBFavBreeds();
    }, [setMyBreeds]);

    const handleDrop = (result) => {
        if (!result.destination) return;
        const { source, destination } = result;
        if (destination.droppableId === "myBreeds") {
            const newFavBreeds = { ...myBreeds };
            newFavBreeds[result.draggableId] = currentSearchBreeds[result.draggableId].image_link;
            delete currentSearchBreeds[result.draggableId];
            setMyBreeds(newFavBreeds);
        }
    };

    return (
        <DragDropContext onDragEnd={handleDrop}>
            <Droppable droppableId="favBreeds">
                {(provided) => (
                    <Box {...provided.droppableProps} ref={provided.innerRef}>
                        {Object.keys(favBreeds).map((key, index) => (
                            <Draggable key={key} draggableId={key} index={index}>
                                {(provided) => (
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                        <BreedCard dog={{ name: key, image_link: favBreeds[key] }} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </Box>
                )}
            </Droppable>
            <Button variant="contained" color="primary" style={{ marginTop: '10px' }}>
                Find My Dog!
            </Button>
        </DragDropContext>
    );
};

export default FavBreedsRail;