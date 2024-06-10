import React, { useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useLayout } from '../contexts/LayoutContext';
import DroppableArea from './DroppableArea';
import DragDogSearchCard from './DragDogSearchCard';
import { useTheme } from '@emotion/react';
import api from '../contexts/api';
import { useNavigate } from 'react-router-dom';

const DogSearchView = () => {
    const { myDogs, userFavDogs, setMyDogs, setUserFavDogs } = useDogSearch();
    const { isFavBreedRailOpen, isDoggyWalletOpen, sizeConfig, setNavOpen } = useLayout();
    const theme = useTheme();
    const navigate = useNavigate();

    const handleDrop = async (item) => {
        console.log('Dropped item:', item);
        const draggedDog = userFavDogs.find(dog => dog.api_id === item.dog.api_id);

        if (!draggedDog) {
            console.warn(`Dog not found in user's Dogs:`, item.dog.api_id);
            return;
        }

        const updatedUserFavDogs = userFavDogs.filter(dog => dog.api_id !== item.dog.api_id);
        setUserFavDogs(updatedUserFavDogs);

        const updatedMyDogs = [...myDogs, draggedDog];
        setMyDogs(updatedMyDogs);

        try {
            await api.delete(`/api/rem_favdog/${draggedDog.api_id}`);
            console.log('Favorite dog removed successfully');
        } catch (error) {
            console.error('Failed to remove favorite dog:', error);
        }
    };

    useEffect(() => {
        if (!myDogs || myDogs.length === 0) {
            navigate('/home');
        }
    }, []);

    return (
        <Box sx={{ width: '100%', height: '100%', overflow: 'auto', padding: '16px' }}>
        <DroppableArea id="dogSearch" onDrop={handleDrop} acceptType="dog">
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: sizeConfig.gridTemplateColumns,
                        gap: theme.spacing(sizeConfig.spacing),
                    }}
                >
                    {myDogs.map((dog) => (
                        <Box key={dog.api_id} sx={{ gridColumn: 'span 1', maxWidth: sizeConfig.getMaxCardWidth(isFavBreedRailOpen, isDoggyWalletOpen) }}>
                            <DragDogSearchCard dog={dog} />
                        </Box>
                    ))}
                </Box>
            </DroppableArea>
        </Box>
    );
};

export default DogSearchView;