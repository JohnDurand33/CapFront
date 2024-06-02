import { useState, useEffect } from 'react';
import { useLayout } from '../contexts/LayoutContext';
import { useLogin } from '../contexts/LoginContext';
import { Grid } from '@mui/material';
import HomeDogCard from './HomeDogCard';
import useAppBarHeight from '../hooks/useAppBarHeight';


const Home = () => {
    const { appBarRef } = useAppBarHeight();
    const apiKey = import.meta.env.VITE_RESCUE_KEY; 
    const { zipCode, loggedIn, token } = useLogin();
    const [homeDogs, setHomeDogs] = useState([]);
    const [dogList, setDogList] = useState([]); 
    const { setFavBreedRailOpen, setNavOpen } = useLayout();

    useEffect(() => {
        if (loggedIn) {
            const homePageCall = async () => {
                console.log('Inside homePageCall');
                console.log('API Key:', apiKey);
                console.log('Zip Code:', zipCode);

                const payload = {
                    "apikey": "t4mQWFjp",
                    "objectType": "animals",
                    "objectAction": "publicSearch",
                    "search":
                    {
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
                }
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

                        const dogsArray = Object.values(data.data); // Convert data.data object to an array
                        setHomeDogs(dogsArray);
                        console.log('Converted Dogs Array:', dogsArray);
                    } else {
                        console.error('Unexpected response format:', data);
                        setHomeDogs([]); // Set an empty array if the response format is unexpected
                    }
                } catch (error) {
                    console.error('Failed to fetch dogs:', error);
                    setHomeDogs([]); // Set an empty array in case of an error
                }
            }
            setNavOpen(true);
            homePageCall();
        }
    }, [loggedIn, appBarRef, token]);

    return (
        <Grid item xs={12} sm={6} md={4} lg={3} >
            {homeDogs && homeDogs.map(dog => {
                console.log('Dog:', dog);
                <HomeDogCard dog={dog} />
            })}
        </Grid>
    );
};

export default Home;
