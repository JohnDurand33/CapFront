import React from 'react';
import { Grid, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useLayout } from '../contexts/LayoutContext';
import DroppableArea from './DroppableArea';
import DragBreedCard from './DragBreedCard';
import api from '../contexts/api';

const BreedSearchView = () => {
    const theme = useTheme();
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
            {myBreeds.length === 0 ? (
                <Grid container spacing={2} 
                    sx={{
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <Box
                        sx={{
                            border: '2px dashed grey',
                            borderRadius: '4px',
                            padding: '16px',
                            textAlign: 'center',
                            backgroundColor: theme.palette.background.paper,
                            color: theme.palette.text.primary
                        }}
                    >
                        No Breeds Found or You Have Preferred Them All!
                    </Box></Grid>) : (<Grid container spacing={2}>
                {myBreeds.map((breed, index) => (
                    <Grid item xs={12} sm={6} md={4} key={breed.image_link}>
                        <DragBreedCard breed={breed} />
                    </Grid>
                ))}
            </Grid>
    )}
        </DroppableArea>
    );
};

export default BreedSearchView;