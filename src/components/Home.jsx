import React, { useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useLayout } from '../contexts/LayoutContext';
import { useLogin } from '../contexts/LoginContext';
import DragHomeDogCard from './DragHomeDogCard';
import DroppableArea from './DroppableArea';
import api from '../contexts/api';
import { useDogSearch } from '../contexts/DogSearchContext';

const Home = () => {
    const { zipCode } = useLogin();
    const { homeDogs, setHomeDogs, userFavDogs, setUserFavDogs } = useDogSearch();
    const { setNavOpen } = useLayout();

    useEffect(() => {
        setHomeDogs([]);
        setNavOpen(true);
        const homePageCall = async () => {
            console.log('Inside homePageCall');

            const payload = {
                "apikey": "t4mQWFjp",
                "objectType": "animals",
                "objectAction": "publicSearch",
                "search": {
                    "resultStart": "0",
                    "resultLimit": "50",
                    "resultSort": "animalID",
                    "resultOrder": "asc",
                    "filters": [
                        {
                            "fieldName": "animalSpecies",
                            "operation": "equals",
                            "criteria": "Dog"
                        },
                        {
                            "fieldName": "animalStatus",
                            "operation": "equals",
                            "criteria": "Available"
                        },
                        {
                            "fieldName": "animalLocationDistance",
                            "operation": "radius",
                            "criteria": "100"
                        },
                        {
                            "fieldName": "animalLocation",
                            "operation": "equals",
                            "criteria": zipCode ? zipCode : "90210"
                        }
                    ],
                    "fields": [
                        "animalName", "animalID", "animalOrgID", "animalAgeString", "animalBreed", "animalColor",
                        "animalDescription", "animalLocationDistance", "animalLocationCitystate", "animalLocationState",
                        "animalLocation", "animalStatusID", "animalThumbnailUrl", "animalSex", "animalSpecies"
                    ]
                }
            };

            const url = 'https://api.rescuegroups.org/http/v2.json';
            const headers = {
                'Content-Type': 'application/json'
            };

            try {
                console.log('Fetching dogs from RescueGroups...');
                const response = await fetch(url, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(payload),
                    cache: 'no-cache'
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log('Dogs fetched from RescueGroups:', data);

                if (data.data && typeof data.data === 'object') {
                    const dogsArray = Object.values(data.data)
                        .filter(dog => dog.animalThumbnailUrl && dog.animalThumbnailUrl.trim() !== '')
                        .map(dog => ({
                            api_id: dog.animalID,
                            name: dog.animalName,
                            org_id: dog.animalOrgID,
                            age: dog.animalAgeString,
                            breed: dog.animalBreed,
                            color: dog.animalColor,
                            sex: dog.animalSex,
                            city: dog.animalLocationCitystate,
                            state: dog.animalLocationState,
                            dog_zip_code: dog.animalLocation,
                            img_url: dog.animalThumbnailUrl,
                            status: dog.animalStatusID,
                        }));
                    setHomeDogs(dogsArray);
                    console.log('Filtered Dogs Array:', dogsArray);
                } else {
                    console.error('Unexpected response format:', data);
                    setHomeDogs([]); // Set an empty array if the response format is unexpected
                }
            } catch (error) {
                console.error('Failed to fetch dogs:', error);
                setHomeDogs([]); // Set an empty array in case of an error
            }
        }
        homePageCall();
    }, [zipCode]);

    const handleDrop = async (item) => {
        const draggedDog = userFavDogs.find(dog => dog.api_id === item.dog.api_id);

        if (!draggedDog) {
            console.warn(`Dog not found in user fav's Dogs:`, item.dog.name);
            return;
        }

        const updatedUserFavDogs = userFavDogs.filter(dog => dog.api_id !== item.dog.api_id);
        setUserFavDogs(updatedUserFavDogs);

        try {
            await api.delete(`/api/rem_favdogs/${draggedDog.api_id}`);
            console.log('FavDog removed successfully');
        } catch (error) {
            console.error('Failed to remove FavDog:', error);
        }
    };

    return (
        <Box sx={{ width: '100%', height: '100%', overflow: 'auto', padding: '16px' }}>
            <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mb: 5 }}>
                Available Dogs Near You!!!
            </Typography>
            <DroppableArea onDrop={handleDrop} className="custom-droppable-area" acceptType='dog'>
                <Grid container spacing={2}>
                    {homeDogs.map(dog => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={dog.api_id}>
                            <DragHomeDogCard dog={dog} />
                        </Grid>
                    ))}
                </Grid>
            </DroppableArea>
        </Box>
    );
};

export default Home;