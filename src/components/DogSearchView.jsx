import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Box } from '@mui/material';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useLogin } from '../contexts/LoginContext';
import DroppableArea from './DroppableArea';
import DragSearchDogCard from './DragSearchDogCard';
import axios from 'axios';


const DogSearchView = () => {
    const { myDogs, setMyDogs, userFavDogs, setUserFavDogs } = useDogSearch();
    const navigate = useNavigate();
    const { loggedIn } = useLogin();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/login');
        }
        try {
            handleSearch();
        } catch (error) {
            console.error('Failed to fetch matched dogs:', error);
        }
    }, [loggedIn]);

    const handleSearch = async () => {
        try {
            const url = 'http://localhost:5000/auth/matchdogs';
            const response = await axios.post(url, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userFavBreeds })
            })
        } catch (error) {
            console.error('Failed to fetch matched dogs:', error);} 
        
        const dogs = response.data;
        setMyDogs(dogs);
        console.log('Matched dogs:', dogs);
    }

    const handleDrop = (item, monitor, dropResult) => {
        if (!dropResult) return;

        if (dropResult.id === 'removeDog') {

            const updatedFavDogs = userFavDogs.filter(breed => breed.name !== item.dog.name);
            setUserFavDogss(updatedFavDogs);

            const updatedMyDogs = [...myDogs, item.dog];
            setMyDogs(updatedMyDogs);
        }
    };

    return (
        <>
            <DroppableArea id="searchDogView" onDrop={handleDrop}>
                <Grid container spacing={2}>
                    {!myDogs ? <Box sx={{ p: 2 }}>Please Try Another Search.  No Dogs Available Near You.</Box> : null}
                    {myDogs.map((dog) => (
                        <Grid item xs={12} sm={6} md={4} key={dog.id}>
                            <DragSearchDogCard dog={dog} />
                        </Grid>
                    ))}
                </Grid>
            </DroppableArea>
                <Box
                    sx={{
                        padding: 1,
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                ><Button backgroundColor="primary" onClick={handleSearch}>
                    Click To Find Dogs!
                </Button>
                </Box>
        </>
    );
};

export default DogSearchView;