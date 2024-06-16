import React from 'react';
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useLayout } from '../contexts/LayoutContext';
import DogCard from './DogCard';
import { useDrop } from 'react-dnd';
import { ItemTypes } from '../utils/ItemTypes';

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

    return (
        <Box ref={drop} sx={{ width: '100%', height: '100%', overflow: 'auto', paddingTop: 8, backgroundColor: isOver ? 'lightblue' : 'white' }}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: sizeConfig.gridTemplateColumns,
                    gap: theme.spacing(sizeConfig.spacing),
                }}
            >
                {myDogs.map((dog, index) => (
                    <Box key={dog.api_id} sx={{ gridColumn: 'span 1', maxWidth: sizeConfig.getMaxCardWidth(isFavBreedRailOpen, isDoggyWalletOpen) }}>
                        <DogCard dog={dog} index={index} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

const handleDrop = async (item, myDogs, setMyDogs, userFavDogs, setUserFavDogs) => {
    const draggedDog = userFavDogs.find(dog => dog.api_id === item.api_id);

    if (!draggedDog) {
        console.warn(`Dog not found in userFavDogs:`, item.name);
        return;
    }

    const updatedUserFavDogs = userFavDogs.filter(dog => dog.api_id !== item.api_id);
    setUserFavDogs(updatedUserFavDogs);

    const updatedMyDogs = [...myDogs, draggedDog];
    setMyDogs(updatedMyDogs);

    try {
        console.log('Adding FavDog:', draggedDog.api_id);
        await api.post('/api/add_favdog', { dog_id: draggedDog.api_id });
        console.log('FavDog added successfully');
    } catch (error) {
        console.error('Failed to add FavDog:', error);
    }
};

export default DogSearchView;