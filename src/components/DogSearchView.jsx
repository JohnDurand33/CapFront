import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useLogin } from '../contexts/LoginContext';
import { useLayout } from '../contexts/LayoutContext';
import { useNavigate } from 'react-router-dom';
import DroppableArea from './DroppableArea';
import DragSearchDogCard from './DragSearchDogCard';

const DogSearchView = () => {
    const { myDogs, setMyDogs, userFavDogs, setUserFavDogs } = useDogSearch();
    const { setFavBreedRailOpen } = useLayout();
    const { loggedIn, token } = useLogin();
    const navigate = useNavigate();

    if (!loggedIn) {
        navigate('/login');
        return null;
    }

    useEffect(() => {
        setFavBreedRailOpen(true);
        const fetchDogs = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/matchbreeds', {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
                const result = await response.json();
                console.log("Favorite dogs fetched from user's database with api:", result);
                setMyDogs(result);
            } catch (error) {
                console.error('Failed to fetch favorite dogs:', error);
            }
        };
        fetchDogs();
    }, [loggedIn, navigate, setMyDogs, setFavBreedRailOpen, token]);

    const handleDrop = (item) => {
        console.log('Dropped item:', item);
        const draggedDog = userFavDogs.find((searchDog) => searchDog.name === item.dog.name);

        if (!draggedDog) {
            console.warn(`Failed to find a dog:`, item.dog.name);
            return;
        }

        const updatedUserFavDogs = userFavDogs.filter((searchDog) => searchDog.name !== item.dog.name);
        setUserFavDogs(updatedUserFavDogs);

        const updatedMyDogs = [...myDogs, draggedDog];
        setMyDogs(updatedMyDogs);

        // Fetch to update dogs (more complicated with adding and removing relationships)
    };

    return (
        <DroppableArea id="searchDogView" onDrop={handleDrop}>
            <Grid container spacing={2}>
                {myDogs.map((dog) => (
                    <Grid item xs={12} sm={6} md={4} key={dog.id}>
                        <DragSearchDogCard dog={dog} />
                    </Grid>
                ))}
            </Grid>
        </DroppableArea>
    );
};

export default DogSearchView;