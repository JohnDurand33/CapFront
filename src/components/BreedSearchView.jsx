import React from 'react';
import { Grid } from '@mui/material';
import { useDogSearch } from '../contexts/DogSearchContext';
import DraggableBreedCard from './DragBreedCard'; 
import DroppableArea from './DroppableArea';
import DragBreedCard from './DragBreedCard';

const BreedSearchView = () => {
    const { myBreeds } = useDogSearch();

    return (
        <DroppableArea id="breedSearch">
            <Grid container spacing={2}>
                {myBreeds.map((dog, index) => (
                    <Grid item xs={12} sm={6} md={4} key={dog.id}>
                        <DraggableBreedCard dog={dog} />
                    </Grid>
                ))}
            </Grid>
        </DroppableArea>
    );
};

export default BreedSearchView;