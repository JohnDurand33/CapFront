import React from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useLayout } from '../contexts/LayoutContext';
import DogCard from './DogCard';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/ItemTypes';
import api from '../contexts/api';

const DogSearchView = () => {
    const theme = useTheme();
    const { userFavDogs, setUserFavDogs, myDogs, setMyDogs } = useDogSearch();
    const { isFavBreedRailOpen, isDoggyWalletOpen, sizeConfig } = useLayout();

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.DOG,
        drop: (item) => handleDrop(item, myDogs, setMyDogs, userFavDogs, setUserFavDogs),
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
            {myDogs.length === 0 ? (
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
                        No dogs have been located. Please search for your perfect pet.
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
                    {myDogs.map((dog) => (
                        <Box key={dog.api_id} sx={{ gridColumn: 'span 1', maxWidth: sizeConfig.getMaxCardWidth(isFavBreedRailOpen, isDoggyWalletOpen) }}>
                            <DogCard dog={dog} />
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
};

const handleDrop = async (item, myDogs, setMyDogs, userFavDogs, setUserFavDogs) => {
    const draggedDog = userFavDogs.find(dog => dog.api_id === item.dog.api_id);

    if (!draggedDog) {
        console.warn(`Dog not found in userFavDogs:`, item.dog.name);
        return;
    }

    const updatedUserFavDogs = userFavDogs.filter(dog => dog.api_id !== item.dog.api_id);
    setUserFavDogs(updatedUserFavDogs);

    const updatedMyDogs = [...myDogs, draggedDog];
    setMyDogs(updatedMyDogs);

    try {
        await api.delete(`/api/rem_favdog/${draggedDog.api_id}`);
        console.log('FavDog removed successfully');
    } catch (error) {
        console.error('Failed to remove FavDog:', error);
    }
};

export default DogSearchView;