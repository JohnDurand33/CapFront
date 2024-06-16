import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DogCard from './DogCard';
import { useDrop } from 'react-dnd';
import api from '../contexts/api';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useLayout } from '../contexts/LayoutContext';
import { useLogin } from '../contexts/LoginContext';
import { ItemTypes } from '../utils/ItemTypes';
import { jwtDecode } from 'jwt-decode';
import { getRandomZip } from '../utils/randomZip';

const Home = () => {
    const theme = useTheme();
    const { homeDogs, setHomeDogs, userFavDogs, setUserFavDogs } = useDogSearch();
    const { setNavOpen, sizeConfig, isFavBreedRailOpen, isDoggyWalletOpen } = useLayout();
    const [fetchZip, setFetchZip] = useState('');
    const [loading, setLoading] = useState(true);
    const { loggedIn, token } = useLogin();

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

    const [{ isOver }, drop] = useDrop({
        accept: ItemTypes.DOG,
        drop: (item) => handleDrop(item, homeDogs, setHomeDogs, userFavDogs, setUserFavDogs),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    if (loading) {
        return <Typography variant="h4" component="h1" align="center" gutterBottom >Loading...</Typography>;
    }

    return (
        <Box ref={drop} sx={{ width: '100%', height: '100%', overflow: 'auto', paddingTop: 8, backgroundColor: isOver ? 'lightblue' : 'white' }}>
            {!loading && (
                <Typography variant="h2" component="h1" align="center" gutterBottom sx={{ mb: 5 }}>
                    Available Dogs Near Zip Code {fetchZip}
                </Typography>
            )}
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: sizeConfig.gridTemplateColumns,
                    gap: theme.spacing(sizeConfig.spacing),
                }}
            >
                {homeDogs.map((dog, index) => (
                    <Box key={dog.api_id} sx={{ gridColumn: 'span 1', maxWidth: sizeConfig.getMaxCardWidth(isFavBreedRailOpen, isDoggyWalletOpen) }}>
                        <DogCard dog={dog} index={index} />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

const handleDrop = async (item, homeDogs, setHomeDogs, userFavDogs, setUserFavDogs) => {
    const draggedDog = userFavDogs.find(dog => dog.api_id === item.api_id);

    if (!draggedDog) {
        console.warn(`Dog not found in userFavDogs:`, item.name);
        return;
    }

    const updatedUserFavDogs = userFavDogs.filter(dog => dog.api_id !== item.api_id);
    setUserFavDogs(updatedUserFavDogs);

    const updatedHomeDogs = [...homeDogs, draggedDog];
    setHomeDogs(updatedHomeDogs);

    try {
        console.log('Adding FavDog:', draggedDog.api_id);
        await api.post('/api/add_favdog', { dog_id: draggedDog.api_id });
        console.log('FavDog added successfully');
    } catch (error) {
        console.error('Failed to add FavDog:', error);
    }
};

export default Home;