import React, { useEffect } from 'react';
import { Grid } from '@mui/material';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useLayout } from '../contexts/LayoutContext';
import DroppableArea from './DroppableArea';
import DragDogSearchCard from './DragDogSearchCard';
import api from '../contexts/api';

const DogSearchView = () => {
    const { myDogs, userFavDogs, setMyDogs, setUserFavDogs } = useDogSearch();
    const { setDoggyWalletOpen } = useLayout();

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

    return (
        <DroppableArea id="dogSearch" onDrop={handleDrop} acceptType="dog">
            <Grid container spacing={2}>
                {myDogs.map((dog, index) => (
                    <Grid item xs={12} sm={6} md={4} key={dog.api_id}>
                        <DragDogSearchCard dog={dog} />
                    </Grid>
                ))}
            </Grid>
        </DroppableArea>
    );
};

export default DogSearchView;