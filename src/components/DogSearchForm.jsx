import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Grid, Box, Typography, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, FormHelperText } from '@mui/material';
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
    const [showNotification, setShowNotification] = useState(false);
    const { setResults } = useDogSearch();
    const { toggleDogSearch } = useLayout();
    const [breedNameSearchView, setBreedNameSearchView] = useState(false);
    const breedNameRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (breedNameRef.current && !breedNameRef.current.contains(event.target)) {
                if (formData.name) {
                    setShowNotification(true);
                } else {
                    setShowNotification(false);
                }
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [formData.name]);

    const createRadioGroup = (header, name, value) => (
        <Grid item xs={12}>
            <FormControl component="fieldset" fullWidth>
                <FormLabel component="legend" style={{ color: 'inherit' }}>
                    <Typography variant="h6" style={{ color: 'inherit' }}>{header}</Typography>
                </FormLabel>
                <RadioGroup
                    row
                    name={name}
                    value={value}
                    onChange={handleChange}
                >
                    <FormControlLabel value="" control={<Radio color="primary" />} label="Any" />
                    <FormControlLabel value="1,2" control={<Radio color="primary" />} label="Low" />
                    <FormControlLabel value="2,3,4" control={<Radio color="primary" />} label="Mid" />
                    <FormControlLabel value="4,5" control={<Radio color="primary" />} label="High" />
                </RadioGroup>
            </FormControl>
        </Grid>
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData, [name]: value
        }));

        // Disable other form fields if a breed name is entered
        if (name === 'name') {
            if (value !== '') {
                setBreedNameSearchView(true);
                setShowNotification(true);
            } else {
                setBreedNameSearchView(false);
                setShowNotification(false);
            }
        }
    };

    const handleSubmit = async (e) => {
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
                headers: { 'X-Api-Key': import.meta.env.VITE_NINJA_API_KEY },
            });
            console.log(response.data);
            setResults(response.data);
            toggleDogSearch();
            navigate('/breedview');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Typography variant="body1" gutterBottom sx={{ mt: 2 }}>
                <strong>Size Ranges:</strong><br />
                Small: Up to 20 lbs<br />
                Medium: 21 to 60 lbs<br />
                Large: 61 to 100 lbs<br />
                Extra Large: Over 100 lbs
            </Typography>
            {showNotification && (
                <Typography variant="body2" color="error" mt="1" mb={2}>
                    Please clear the breed name field to search for breeds by their attributes.
                </Typography>
            )}
            <Grid container spacing={2}>
                <Grid item xs={12} ref={breedNameRef}>
                    <TextField
                        fullWidth
                        label="Breed name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </Grid>
                {!breedNameSearchView && (
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
                                    <FormControlLabel value="small" control={<Radio color="primary" />} label="Small" />
                                    <FormControlLabel value="medium" control={<Radio color="primary" />} label="Medium" />
                                    <FormControlLabel value="large" control={<Radio color="primary" />} label="Large" />
                                    <FormControlLabel value="extra_large" control={<Radio color="primary" />} label="Extra Large" />
                                    <FormControlLabel value="not_applicable" control={<Radio color="primary" />} label="Not Applicable" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormHelperText>Selecting "Any" will remove the filter from your Search</FormHelperText>
                        </Grid>
                        {createRadioGroup("Shedding", "shedding", formData.shedding)}
                        {createRadioGroup("Barking", "barking", formData.barking)}
                        {createRadioGroup("Energy", "energy", formData.energy)}
                        {createRadioGroup("Protectiveness", "protectiveness", formData.protectiveness)}
                        {createRadioGroup("Trainability", "trainability", formData.trainability)}
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