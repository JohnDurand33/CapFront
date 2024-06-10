import { Button } from '@mui/material';
import api from '../contexts/api';

const FindMyDogButton = () => {

    const saveFavBreedsToBackend = async (favBreeds) => {
        try {
            await api.post('/api/updatebreeds', favBreeds, {
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

export default FindMyDogButton;