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
    const { isFavBreedRailOpen, isDoggyWalletOpen, sizeConfig } = useLayout();

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

    const maxCardWidth = sizeConfig.getMaxCardWidth(isFavBreedRailOpen, isDoggyWalletOpen);
    console.log('Computed maxCardWidth:', maxCardWidth);

    return (
        <DroppableArea id="breedSearch" acceptType="breed" onDrop={handleDrop} >
            {myBreeds.length === 0 ? (
                <Grid container spacing={3}
                    sx={{
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingTop: theme.spacing(8)
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
                    </Box></Grid>) : (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: sizeConfig.gridTemplateColumns,
                        gap: theme.spacing(sizeConfig.spacing),
                        maxWidth: '100%', 
                    }}
                >
                    {myBreeds.map((breed, index) => (
                        <Box
                            key={breed.id}
                            sx={{
                                gridColumn: 'span 1',
                                maxWidth: maxCardWidth, 
                            }}
                        >
                            <DragBreedCard breed={breed} />
                        </Box>
                    ))}
                </Box>
            )}
            </DroppableArea>

    );
};

export default BreedSearchView;