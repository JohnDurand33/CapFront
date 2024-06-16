import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useLayout } from '../contexts/LayoutContext';
import BreedCard from './BreedCard';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/ItemTypes';

const BreedSearchView = () => {
    const theme = useTheme();
    const { myBreeds, setMyBreeds, userFavBreeds, setUserFavBreeds } = useDogSearch();
    const { isFavBreedRailOpen, isDoggyWalletOpen, sizeConfig } = useLayout();

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.BREED,
        drop: (item) => handleDrop(item, myBreeds, setMyBreeds, userFavBreeds, setUserFavBreeds),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <Box ref={drop} sx={{ width: '100%', height: '100%', overflow: 'auto', paddingTop: 8, backgroundColor: isOver ? 'lightblue' : 'white' }}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: sizeConfig.gridTemplateColumns,
                    gap: theme.spacing(sizeConfig.spacing),
                }}
            >
                {myBreeds.map((breed, index) => (
                    <Box key={breed.id} sx={{ gridColumn: 'span 1', maxWidth: sizeConfig.getMaxCardWidth(isFavBreedRailOpen, isDoggyWalletOpen) }}>
                        <BreedCard breed={breed} index={index} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

const handleDrop = async (item, myBreeds, setMyBreeds, userFavBreeds, setUserFavBreeds) => {
    const draggedBreed = userFavBreeds.find(breed => breed.name === item.breed.name);

    if (!draggedBreed) {
        console.warn(`Breed not found in userFavBreeds:`, item.breed.name);
        return;
    }

    const updatedUserFavBreeds = userFavBreeds.filter(breed => breed.name !== item.breed.name);
    setUserFavBreeds(updatedUserFavBreeds);

    const updatedMyBreeds = [...myBreeds, draggedBreed];
    setMyBreeds(updatedMyBreeds);

    try {
        await api.post('/api/updatebreeds', { fav_breeds: updatedUserFavBreeds });
        console.log('Favorite breeds updated successfully');
    } catch (error) {
        console.error('Failed to update favorite breeds:', error);
    }
};

export default BreedSearchView;