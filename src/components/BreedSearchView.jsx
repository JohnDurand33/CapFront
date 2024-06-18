import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useLayout } from '../contexts/LayoutContext';
import BreedCard from './BreedCard';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/ItemTypes';
import api from '../contexts/api';

const BreedSearchView = () => {
    const theme = useTheme();
    const { myBreeds, setMyBreeds, userFavBreeds, setUserFavBreeds } = useDogSearch();
    const { isFavBreedRailOpen, isDoggyWalletOpen, sizeConfig } = useLayout();

    const [{ isOver }, drop] = useDrop({
        accept: [ItemTypes.BREED],
        drop: (item) => handleDrop(item, myBreeds, setMyBreeds, userFavBreeds, setUserFavBreeds),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    const getDropAreaStyles = (isOver) => ({
        width: '100%',
        height: '100%',
        overflow: 'auto',
        paddingTop: 8,
        backgroundColor: isOver ? '#aca9a9' : theme.palette.background.default, // Use '#aca9a9' for hover color
        transition: 'background-color 0.2s ease-in-out',
        marginRight: theme.spacing(sizeConfig.spacing),
    });

    return (
        <Box ref={drop} sx={getDropAreaStyles(isOver)}>
            {myBreeds.length === 0 ? (
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                        border: '2px dashed grey',
                        borderRadius: '4px',
                        padding: '16px',
                        textAlign: 'center',
                        backgroundColor: theme.palette.background.paper,
                        color: theme.palette.text.primary,
                    }}
                >
                    <Typography variant="h6">
                        No breeds have been located. Please search for your perfect pet.
                    </Typography>
                </Box>
            ) : (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: sizeConfig.gridTemplateColumns,
                        gap: theme.spacing(sizeConfig.spacing),
                    }}
                >
                    {myBreeds.map((breed) => (
                        <Box key={breed.id} sx={{ gridColumn: 'span 1', maxWidth: sizeConfig.getMaxCardWidth(isFavBreedRailOpen, isDoggyWalletOpen) }}>
                            <BreedCard breed={breed} />
                        </Box>
                    ))}
                </Box>
            )}
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
    setMyBreeds([...myBreeds, draggedBreed]);

    try {
        await api.post('/api/updatebreeds', { fav_breeds: updatedUserFavBreeds });
        console.log('Favorite breeds updated successfully');
    } catch (error) {
        console.error('Failed to update favorite breeds:', error);
    }
};

export default BreedSearchView;