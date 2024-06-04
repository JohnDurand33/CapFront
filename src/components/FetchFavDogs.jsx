import api from './api'; // Import the Axios instance

const fetchFavoriteDogs = async () => {
    try {
        const response = await api.get('/get_favdogs');
        return response.data; // Assuming the response contains the favorite dogs data
    } catch (error) {
        console.error('Error fetching favorite dogs:', error);
        throw error; // Propagate the error to the caller
    }
};

export default fetchFavoriteDogs;