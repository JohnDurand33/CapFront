import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { TextField, Button, Grid, Box, Typography, RadioGroup, FormControlLabel, Radio, FormControl, FormLabel, FormHelperText } from '@mui/material';
import axios from 'axios';
import { useLayout } from '../contexts/LayoutContext';

const BreedSearchForm = ({ myBreeds, setMyBreeds }) => {
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
    const [searchingBreedName, setSearchingBreedName] = useState(false);
    const breedNameRef = useRef(null);
    const { toggleBreedSearchForm, toggleFavBreedRail } = useLayout();
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (breedNameRef.current && !breedNameRef.current.contains(event.target)) {
                setShowNotification(!!formData.name);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [formData.name]);

    useEffect(() => {
        // Log to see what's actually in myBreeds when it attempts to render
        console.log("BreedSearchForm myBreeds:", myBreeds);
    }, [myBreeds]);

    const createRadioGroupAttr = (header, name, value) => (
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
        setSearchingBreedName(value && name === 'name');
        setShowNotification(value && name === 'name');
    };

    const prepareBehavioralData = (formData) => {
        const attributes = ['shedding', 'barking', 'energy', 'protectiveness', 'trainability'];
        return attributes.reduce((acc, attr) => {
            if (formData[attr] && formData[attr] !== 'Any') {
                acc[attr] = formData[attr].includes(',') ? formData[attr].split(',') : [formData[attr]];
            }
            return acc;
        }, {});
    };

    const preparePhysicalData = (formData) => {
        if (formData.size && formData.size !== 'not_applicable') {
            const sizeDict = {
                'small': { min_weight: '0', max_weight: '10'},
                'medium': { min_weight: '31', max_weight: '50'},
                'large': { min_weight: '71', max_weight: '90'},
                'extra_large': { min_weight: '101', max_weight: '200' }
            };
            return sizeDict[formData.size];
        }
        return {};
    };

    const getAllCombinations = (data) => {
        const keys = Object.keys(data);
        const results = [];
        const combine = (index, result) => {
            const key = keys[index];

            const values = Array.isArray(data[key]) ? data[key] : [data[key]];
            values.forEach(value => {
                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    Object.keys(value).forEach(subKey => {
                        const newResult = { ...result, [subKey]: value[subKey] };
                        if (index === keys.length - 1) {
                            results.push(newResult);
                        } else {
                            combine(index + 1, newResult);
                        }
                    });
                } else {
                    const newResult = { ...result, [key]: value };
                    if (index === keys.length - 1) {
                        results.push(newResult);
                    } else {
                        combine(index + 1, newResult);
                    }
                }
            });
        };

        combine(0, {});
        return results;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handling direct name searches
        if (formData.name) {
            try {
                // Direct API call with name parameter
                const response = await axios.get(`https://api.api-ninjas.com/v1/dogs?name=${encodeURIComponent(formData.name)}`, {
                    headers: { 'X-Api-Key': import.meta.env.VITE_NINJA_API_KEY },
                });
                setMyBreeds(response.data);
                console.log('favBreeds -> with response.data set to this variable:', myBreeds);
                toggleFavBreedRail();
                toggleBreedSearchForm();
                navigate('/breedview');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        } else {
            // Prepare data for API call when searching by attributes
            const behavioralData = prepareBehavioralData(formData);
            const physicalData = preparePhysicalData(formData);
            const combinedData = { ...behavioralData, ...physicalData };
            const combinations = getAllCombinations(combinedData);
            try {
                const apiResults = [];
                for (const combination of combinations) {
                    const params = new URLSearchParams();
                    for (const [key, value] of Object.entries(combination)) {
                        if (typeof value === 'object' && value !== null) {
        
                            for (const [subKey, subValue] of Object.entries(value)) {
                                params.append(subKey, subValue);
                            }
                        } else {
                            params.append(key, value);
                        }
                    }
                    console.log('params.toString()):', params.toString());
                    const response = await axios.get(`https://api.api-ninjas.com/v1/dogs?${params.toString()}`, {
                        headers: { 'X-Api-Key': import.meta.env.VITE_NINJA_API_KEY }
                    });
                    apiResults.push(response.data);
                    console.log('current run result -> apiResults:', apiResults);
                }
                const total = apiResults.flat();
                console.log('total:', total)
                setMyBreeds(total);
                console.log('BSF setMyBreeds -> with total set to this variable:', myBreeds);
                toggleFavBreedRail();
                toggleBreedSearchForm();
                navigate('/breedview');
            } catch (error) {
                console.error('Error fetching data:', error);
            }
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
                {!searchingBreedName && (
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
                                    <FormControlLabel value="not_applicable" control={<Radio color="primary" />} label="Any" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <FormHelperText>Selecting "Any" will remove the filter from your Search</FormHelperText>
                        </Grid>
                        <Grid item xs={12}>{createRadioGroupAttr("Shedding", "shedding", formData.shedding)}</Grid>
                        <Grid item xs={12}>{createRadioGroupAttr("Barking", "barking", formData.barking)}</Grid>
                        <Grid item xs={12}>{createRadioGroupAttr("Energy", "energy", formData.energy)}</Grid>
                        <Grid item xs={12}>{createRadioGroupAttr("Protectiveness", "protectiveness", formData.protectiveness)}</Grid>
                        <Grid item xs={12}>{createRadioGroupAttr("Trainability", "trainability", formData.trainability)}</Grid>
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

export default BreedSearchForm;