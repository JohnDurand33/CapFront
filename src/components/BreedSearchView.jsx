import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useLayout } from '../contexts/LayoutContext';
import DroppableArea from './DroppableArea';
import DraggableBreedCard from './DragBreedCard';

const BreedSearchView = () => {

    const { myBreeds, userFavBreeds, setMyBreeds, setUserFavBreeds } = useDogSearch();
    const { setFavBreedRailOpen } = useLayout();
    const { user, token } = useLayout();

    useEffect(() => {
        setFavBreedRailOpen(true);
    }, [setFavBreedRailOpen]);

    const handleDrop = (item) => {
        console.log('Dropped item:', item);
        const draggedBreed = userFavBreeds.find(breed => breed.name === item.dog.name);

        if (!draggedBreed) {
            console.warn(`Breed not found in ${user.email}\'s Breeds:`, item.dog.name);
            return;
        }
        if (draggedBreed) {
            const updatedSearchBreeds = userFavBreeds.filter(breed => breed.name !== item.dog.name);
            setUserFavBreeds(updatedSearchBreeds);

            const updatedFavBreeds = [...myBreeds, {
                name: draggedBreed.name,
                image_link: draggedBreed.img_url,
            }];
            setMyBreeds(updatedFavBreeds);

            fetch('http://localhost:5000/api/updatebreeds', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fav_breeds: updatedFavBreeds }),

            }).catch(error => console.error('Failed to update favorite breeds:', error));
        }
    };


    return (
        <DroppableArea id="breedSearch" onDrop={handleDrop}>
            <Grid container spacing={2}>
                {myBreeds.map((dog ) => (
                    <Grid item xs={12} sm={6} md={4} key={dog.id}>
                        <DraggableBreedCard dog={dog} />
                    </Grid>
                ))}
            </Grid>
        </DroppableArea>
    );
};

export default BreedSearchView;