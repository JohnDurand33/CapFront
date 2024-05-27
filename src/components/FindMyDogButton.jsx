import axios from 'axios';
import { Button } from '@mui/material';

const FindMyDogButton = () => {

    const saveFavBreedsToBackend = async (favBreeds) => {
        try {
            await axios.post('/api/update-fav-breeds', favBreeds, {
                headers: { 'X-Api-Key': localStorage.getItem('token') },
                'Content-Type': 'application/json'
            });
            console.log('Favorites saved successfully!');
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

export default FindMyDogButton;