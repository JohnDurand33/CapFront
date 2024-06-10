import { useState, useEffect } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { useLayout } from '../contexts/LayoutContext';
import { useLogin } from '../contexts/LoginContext';
import {useTheme } from '@mui/material/styles';
import DragHomeDogCard from './DragHomeDogCard';
import DroppableArea from './DroppableArea';
import axios from 'axios';
import api from '../contexts/api';
import { useDogSearch } from '../contexts/DogSearchContext';
import { jwtDecode } from 'jwt-decode';
import { getRandomZip } from '../utils/randomZip'; 

const Home = () => {
    const theme = useTheme();
    const { token, loggedIn } = useLogin();
    const { homeDogs, setHomeDogs, userFavDogs, setUserFavDogs } = useDogSearch();
    const { setNavOpen, sizeConfig, isFavBreedRailOpen, isDoggyWalletOpen } = useLayout();
    const [fetchZip, setFetchZip] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setHomeDogs([]);
        setNavOpen(true);

        const fetchDogs = async (zipCode) => {
            const payload = {
                "apikey": import.meta.env.VITE_RESCUEGROUPS_API_KEY,
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
                            "criteria": zipCode
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
                console.log(`Fetching dogs from RescueGroups for zip code: ${zipCode}...`);
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

                if (data.message === "Unexpected system error") {
                    return false;
                }

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
                    return true;
                }
            } catch (error) {
                console.error('Failed to fetch dogs:', error);
                setHomeDogs([]);
                return false;
            }
        };

        const homePageCall = async () => {
            let zipCode = loggedIn ? jwtDecode(token).zip_code : getRandomZip();
            let success = false;

            while (!success) {
                setFetchZip(zipCode);
                success = await fetchDogs(zipCode);
                if (!success) {
                    zipCode = getRandomZip();
                }
            }

            console.log('Zip Code:', zipCode);
            return zipCode;
        };

        homePageCall().then((finalZipCode) => {
            console.log('Final Zip Code:', finalZipCode);
            setLoading(false);
        })
    }, [loggedIn]);

    const handleDrop = async (item) => {
        const draggedDog = userFavDogs.find(dog => dog.api_id === item.dog.api_id);

        if (!draggedDog) {
            console.warn(`Dog not found in user fav's Dogs:`, item.dog.name);
            return;
        }

        const updatedUserFavDogs = userFavDogs.filter(dog => dog.api_id !== item.dog.api_id);
        setUserFavDogs(updatedUserFavDogs);

        try {
            console.log('Removing FavDog:', draggedDog.api_id);
            await api.delete(`api/rem_favdog/${draggedDog.api_id}`);
            console.log('FavDog removed successfully');
        } catch (error) {
            console.error('Failed to remove FavDog:', error);
        }
    }

    if (loading) {
        return <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mb: 5 }}>Loading...</Typography>;
    }

    return (
        <Box sx={{ width: '100%', height: '100%', overflow: 'auto', padding: '16px' }}>
            {!loading && (
                <Typography variant="h4" component="h1" align="center" gutterBottom sx={{ mb: 5 }}>
                    Available Dogs Near Zip Code {fetchZip}
                </Typography>
            )}
            <DroppableArea onDrop={handleDrop} className="custom-droppable-area" acceptType='dog'>
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: sizeConfig.gridTemplateColumns,
                        gap: theme.spacing(sizeConfig.spacing),
                    }}
                >
                    {homeDogs.map((dog) => (
                        <Box key={dog.api_id} sx={{ gridColumn: 'span 1', maxWidth: sizeConfig.getMaxCardWidth(isFavBreedRailOpen, isDoggyWalletOpen) }}>
                            <DragHomeDogCard dog={dog} />
                        </Box>
                    ))}
                </Box>
            </DroppableArea>
        </Box>
    );
};

export default Home;