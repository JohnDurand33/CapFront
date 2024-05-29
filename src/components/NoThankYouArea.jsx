import axios from 'axios';
import { Button } from '@mui/material';
import { useDogSearch } from '../contexts/DogSearchContext';

const NoThankYouArea = () => {
    const { token } = useDogSearch();

    const saveFavBreedsToBackend = async (favBreeds) => {
        try {
            await axios.post('/api/updatebreeds', favBreeds, {
                headers: { 'X-Api-Key': token },
                'Content-Type': 'application/json'
            });
            console.log('Favorites saved successfully!');
            setUserFavBreeds([]);
        } catch (error) {
            console.error('Failed to save favorite breeds:', error);
        }
    };
    return (
        <>
            {/* Existing DragDropContext and Droppable components */}
            <Button onClick={saveFavBreedsToBackend} variant="contained" color="primary">
                Find My Dog!
            </Button>
        </>
    )
};

export default NoThankYouArea;