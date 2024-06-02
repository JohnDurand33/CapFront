import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Box, Grid, useTheme } from '@mui/material';

const HomeDogCard = ({ dog }) => {
    const theme = useTheme();

    return (
        <Box sx={{ m: 2 }}>
            <Card sx={{ boxShadow: 6, borderRadius: 4, border: '2px solid gray', overflow: 'hidden', width: '420px' }}>
                <Box className='searchdog-image' sx={{ display: 'flex', height: '240px' }}>
                    <Box sx={{ flex: '1 1 50%', overflow: 'hidden', borderTopLeftRadius: 12, borderBottomLeftRadius: 12 }}>
                        <CardMedia
                            component="img"
                            alt={dog.animalName}
                            image={dog.animalThumbnailUrl}
                            title={dog.animalName}
                            sx={{
                                objectFit: 'cover',
                                height: '240px',
                                width: '100%',
                            }}
                        />
                    </Box>
                    <Box sx={{ flex: '1 1 50%', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', background: 'linear-gradient(to right, #ADC8FF, #EED959)' }}>
                        <CardContent sx={{ p: 2 }}>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                                sx={{ fontWeight: 'bold', color: '#333' }}
                            >
                                {dog.animalName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 1.5 }}>
                                Age: {dog.animalAgeString ? dog.animalAgeString : 'Not Listed'}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 1.5 }}>
                                Breed: <br />{dog.animalBreed}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 1.5 }}>
                                Color: {dog.animalColor}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 1.5 }}>
                                Sex: {dog.animalSex}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" sx={{ mb: 1.5 }}>
                                Location: {dog.animalLocationCitystate} {dog.animalLocation}
                            </Typography>
                        </CardContent>
                    </Box>
                </Box>
                <Box sx={{ width: '100%' }}>
                    <Button
                        size="large"
                        variant="contained"
                        sx={{
                            borderRadius: 0,
                            width: '100%',
                            height: '60px', // Adjust height as needed
                            backgroundColor: theme.palette.primary.main,
                            color: theme.palette.primary.contrastText,
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                        onClick={() => window.location.href = `mailto:adoption@agency.com?subject=Adoption Inquiry for ${dog.animalName}`}
                    >
                        CONTACT ADOPTION AGENCY
                    </Button>
                </Box>
            </Card>
        </Box>
    );
};

export default HomeDogCard;