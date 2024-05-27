import { useEffect} from 'react';
import { Box, Grid, Typography, Card, CardMedia, CardContent, CardActionArea } from '@mui/material';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useTheme } from '@emotion/react';
import { useLayout } from '../contexts/LayoutContext';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { Draggable } from 'react-beautiful-dnd';
import BreedCard from './BreedCard';


const BreedSearchView = () => {
    const {startFavBreedRail} = useLayout();
    const theme = useTheme();
    const { myBreeds } = useOutletContext();

    useEffect(() => {
        // Log to see what's actually in myBreeds when it attempts to render
        startFavBreedRail;
        console.log("BreedSearchView myBreeds:", myBreeds);
    }, [startFavBreedRail]);


    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
                Search Results
            </Typography>
            <Grid container spacing={2}>
                {myBreeds.map((dog, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card sx={{ backgroundColor: theme.palette.primary.main }}>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    image={dog.image_link}
                                    alt={dog.name}
                                    sx={{ height: "140", width: '100%', aspectRatio: `3/2` }}
                                />
                                <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Typography sx={{ justifySelf: "center" }} variant="h6">{dog.name}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default BreedSearchView;