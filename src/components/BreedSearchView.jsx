import React from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent, CardActionArea } from '@mui/material';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useTheme } from '@emotion/react';
import Draggable from 'react-draggable';


const BreedSearchView = () => {
    const { currentSearchBreeds } = useDogSearch();
    const theme = useTheme();

    const handleDrop = (action) => (event) => {
        
        console.log(`${action} was triggered.`);
    };

    return(
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Search Results
            </Typography>
            <Grid container spacing={2}>
                {currentSearchBreeds.map((dog, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Draggable>
                        <Card sx={{ backgroundColor: theme.palette.primary.main }}>
                            <CardActionArea>
                            <CardMedia
                                component="img"
                                image={dog.image_link}
                                alt="dog.name"
                                sx={{ height:"140", width: '100%', aspectRatio:`3/2` }}
                                
                            />
                            <CardContent sx={{display:'flex', justifyContent:'center'}}>
                                <Typography sx={{justifySelf:"center"}} variant="h6">{dog.name}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                        </Draggable>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', padding: 2 }}>
                <Box
                    sx={{ width: 300, height: 100, backgroundColor: 'lightgreen' }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop('keep')}>
                    logic to save breed to breedSearch list state
                </Box>
                <Box
                    sx={{ width: 300, height: 100, backgroundColor: 'salmon' }}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop('remove')}>
                    logic to delete object from view
                </Box>
            </Box>
        </Box>
    )
};

export default BreedSearchView;