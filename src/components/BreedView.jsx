import React from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent } from '@mui/material';
import { useDogSearch } from '../contexts/DogSearchContext';


const BreedView = () => {
    const { results } = useDogSearch();

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Search Results
            </Typography>
            <Grid container spacing={2}>
                {results.map((dog, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={dog.image_link}
                                alt={dog.name}
                            />
                            <CardContent>
                                <Typography variant="h6">{dog.name}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default BreedView;