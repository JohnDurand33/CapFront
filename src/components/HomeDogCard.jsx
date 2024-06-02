import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const HomeDogCard = ({ dog }) => {
    const theme = useTheme();

    return (
        <Box sx={{ m: 2 }}>
            <Card sx={{ boxShadow: 6, borderRadius: 4, border: '2px solid gray', overflow: 'hidden', width: '420px' }}>
                <Grid container>
                    <Grid item xs={5}>
                        <CardMedia
                            component="img"
                            alt={dog.animalName}
                            image={dog.animalThumbnailUrl}
                            title={dog.animalName}
                            sx={{
                                borderTopLeftRadius: 12,
                                borderTopRightRadius: 12,
                                objectFit: 'fill',
                                height: '280px',
                                width: '210px',
                            }}
                        />
                    </Grid>
                    <Grid item xs={7}>
                        <CardContent sx={{ height: '100%', background: 'linear-gradient(to right, #ADC8FF, #EED959)', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
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
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            size="large"
                            variant="contained"
                            color="primary"
                            sx={{
                                borderRadius: 0,
                                width: '100%',
                                height: '60px', // Adjust height as needed
                                background: 'linear-gradient(to right, #ADC8FF, #EED959)',
                                fontWeight: 'bold',
                                textAlign: 'center',
                            }}
                            onClick={() => window.location.href = `mailto:adoption@agency.com?subject=Adoption Inquiry for ${dog.animalName}`}
                        >
                            CONTACT ADOPTION AGENCY
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
};

export default HomeDogCard;