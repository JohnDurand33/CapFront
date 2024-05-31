import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Box, Button } from '@mui/material';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useLogin } from '../contexts/LoginContext';
import DroppableArea from './DroppableArea';
import DragSearchDogCard from './DragSearchDogCard';
import { useLayout } from '../contexts/LayoutContext';
import axios from 'axios';


const DogSearchView = () => {
    const { myDogs, setMyDogs, userFavDogs, setUserFavDogs } = useDogSearch();
    const { setFavBreedRailOpen, setNavOpen, setBreedSearchFormOpen, setDoggyWalletOpen } = useLayout();
    const navigate = useNavigate();
    const { loggedIn, token } = useLogin();

    useEffect(() => {
        if (!loggedIn) {
            navigate('/login');
        }
        setNavOpen(true);
        const fetchedDogs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/matchbreeds', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                })
                const result = await response.json();
                console.log('Favorite dogs fetched from user\'s database with api:', result);
                setMyDogs(result);
                console.log('myDogs set to state', myDogs);
            } catch (error) {
                console.error('Failed to fetch favorite dogs:', error);
            }
        }
        fetchedDogs();  
    });
    

    const handleDrop = (item) => {
        console.log('Dropped item:', item);
        const draggedDog = userFavDogs.find(searchDog => searchDog.name === item.dog.name);

        if (!draggedDog) {
            console.warn(`Breed not found in ${user.email}\'s Dogs:`, item.dog.name);
            return;
        }
        if (draggedDog) {
            
            const updatedUserFavDogs = userFavDogs.filter(searchDog => searchDog.name !== item.dog.name);
            setUserFavDogs(updatedSearchDogs);

            const updatedMyDogs = [...myDogs, draggedDog];
            setMyDogs(updatedMyDogs);

            //fetch to update dogs (more complicated with add and removeing relationships)
        }
    };

    return (
            <DroppableArea id="searchDogView" onDrop={handleDrop}>
            <Grid container spacing={2}>
                    {myDogs.map((dog ) => (
                            <Grid item xs={12} sm={6} md={4} key={dog.id}>
                            <DragSearchDogCard dog={dog} />
                        </Grid>
                    ))}
                </Grid>
            </DroppableArea>
    );
};

export default DogSearchView;