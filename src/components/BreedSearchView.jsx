import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Box, Grid, Typography } from '@mui/material';
import { useDogSearch } from '../contexts/DogSearchContext';
import BreedCard from './BreedCard';
import { useLayout } from '../contexts/LayoutContext';

const BreedSearchView = ({ myBreeds = [] }) => {
    console.log('myBreeds', myBreeds);
    const {toggleFavBreedRailOpen } = useLayout();
    const { userFavBreeds, setUserFavBreeds } = useDogSearch();

    return (
        <>
        <Droppable droppableId="breedSearch">
            {(provided) => (
                <Box {...provided.droppableProps} ref={provided.innerRef} sx={{ p: 3 }}>
                    <Typography variant="h4" gutterBottom>
                        Search Results
                    </Typography>
                    <Grid container spacing={2}>
                        {myBreeds.map((dog, index) => (
                            <Grid item xs={12} sm={6} md={4} key={dog.id}>
                                <Draggable draggableId={dog.id} index={index}>
                                    {(provided) => (
                                        <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <BreedCard dog={dog} />
                                        </div>
                                    )}
                                </Draggable>
                            </Grid>
                        ))}
                    </Grid>
                    {provided.placeholder}
                </Box>
            )}
            </Droppable>
        </>
    );
};

export default BreedSearchView;