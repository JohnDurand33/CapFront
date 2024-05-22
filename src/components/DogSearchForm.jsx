import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Box, Typography, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel } from '@mui/material';
import axios from 'axios';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useLayout } from '../contexts/LayoutContext';

const DogSearchForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        size: '',
        shedding: '',
        barking: '',
        energy: '',
        protectiveness: '',
        trainability: '',
    });

    const navigate = useNavigate();
    const { setResults } = useDogSearch();
    const { toggleDogSearch } = useLayout();
    const [breedSearch, setBreedSearch] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        // Disable other form fields if a breed name is entered
        if (name === 'name' && value !== '') {
            setBreedSearch(true);
        } else if (name === 'name' && value === '') {
            setBreedSearch(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const params = new URLSearchParams();

        if (formData.name) {
            params.append('name', formData.name);
        } else {
            // Handle size conversion
            if (formData.size && formData.size !== 'not_applicable') {
                switch (formData.size) {
                    case 'small':
                        params.append('min_weight', 1);
                        params.append('max_weight', 20);
                        break;
                    case 'medium':
                        params.append('min_weight', 21);
                        params.append('max_weight', 60);
                        break;
                    case 'large':
                        params.append('min_weight', 61);
                        params.append('max_weight', 100);
                        break;
                    case 'extra_large':
                        params.append('min_weight', 101);
                        break;
                    default:
                        break;
                }
            }

            // Append other form data
            Object.keys(formData).forEach((key) => {
                if (formData[key] && key !== 'size') {
                    params.append(key, formData[key]);
                }
            });
            console.log(params.toString());
        }

        try {
            const response = await axios.get(`https://api.api-ninjas.com/v1/dogs?${params.toString()}`, {
                headers: { 'X-Api-Key': import.meta.env.VITE_API_KEY },
            });
            setResults(response.data);

            // Navigate to BreedView and close the search drawer
            toggleDogSearch();
            navigate('/breedview');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSearch} sx={{ mt: 2 }}>
            <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                <strong>Size Ranges:</strong><br />
                Small: Up to 20 lbs<br />
                Medium: 21 to 60 lbs<br />
                Large: 61 to 100 lbs<br />
                Extra Large: Over 100 lbs
            </Typography>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Breed name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Grid>
                {!breedSearch && (
                    <>
                        <Grid item xs={12}>
                            <FormControl component="fieldset" fullWidth>
                                <FormLabel component="legend">Size</FormLabel>
                                <RadioGroup
                                    name="size"
                                    value={formData.size}
                                    onChange={handleChange}
                                    row
                                >
                                    <FormControlLabel value="small" control={<Radio />} label="Small" />
                                    <FormControlLabel value="medium" control={<Radio />} label="Medium" />
                                    <FormControlLabel value="large" control={<Radio />} label="Large" />
                                    <FormControlLabel value="extra_large" control={<Radio />} label="Extra Large" />
                                    <FormControlLabel value="not_applicable" control={<Radio />} label="Not Applicable" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Shedding (1-5)"
                                type="number"
                                name="shedding"
                                value={formData.shedding}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Barking (1-5)"
                                type="number"
                                name="barking"
                                value={formData.barking}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Energy (1-5)"
                                type="number"
                                name="energy"
                                value={formData.energy}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Protectiveness (1-5)"
                                type="number"
                                name="protectiveness"
                                value={formData.protectiveness}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Trainability (1-5)"
                                type="number"
                                name="trainability"
                                value={formData.trainability}
                                onChange={handleChange}
                            />
                        </Grid>
                    </>
                )}
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        Search
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default DogSearchForm;