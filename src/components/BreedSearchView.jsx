import React from 'react';
import { Grid } from '@mui/material';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useLayout } from '../contexts/LayoutContext';
import DroppableArea from './DroppableArea';
import DragBreedCard from './DragBreedCard';
import api from '../contexts/api';

const BreedSearchView = () => {
    const { myBreeds, userFavBreeds, setMyBreeds, setUserFavBreeds } = useDogSearch();
    const { setFavBreedRailOpen } = useLayout();

    const handleDrop = async (item) => {
        console.log('Dropped item:', item);
        const draggedBreed = userFavBreeds.find(breed => breed.name === item.breed.name);

        if (!draggedBreed) {
            console.warn(`Breed not found in user's Breeds:`, item.breed.name);
            return;
        }


        const updatedFavBreeds = userFavBreeds.filter(breed => breed.name !== item.breed.name);
        setUserFavBreeds(updatedFavBreeds);

        const updatedSearchBreeds = [...myBreeds, draggedBreed];
        setMyBreeds(updatedSearchBreeds);

        try {
            await api.post('/api/updatebreeds', {
                fav_breeds: updatedFavBreeds
            });
            console.log('Favorite breeds updated successfully');
        } catch (error) {
            console.error('Failed to update favorite breeds:', error);
        }
    };

    return (
        <DroppableArea id="breedSearch" acceptType="breed" onDrop={handleDrop}>
            <Grid container spacing={2}>
                {myBreeds.map((breed, index) => (
                    <Grid item xs={12} sm={6} md={4} key={breed.name}>
                        <DragBreedCard breed={breed} />
                    </Grid>
                ))}
            </Grid>
        </DroppableArea>
    );
};

export default BreedSearchView;