import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const HomeDogCard = ({ dog }) => {
    const theme = useTheme();
    return (
        <Card sx={{ boxShadow: 6, borderRadius: 4, border: '2px solid gray', overflow: 'hidden', width: '100%', backgroundColor: theme.palette.background.paper }}>
            <Grid container>
                <Grid item xs={12}>
                    <CardMedia
                        component="img"
                        alt={dog.name}
                        image={dog.img_url}
                        title={dog.name}
                        sx={{
                            width: '100%',
                            height: '400px', // Set the desired height
                            objectFit: 'cover',
                            objectPosition: 'top'
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <CardContent sx={{ textAlign: 'center' }}>
                        <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', color: '#333' }}>
                            {dog.name}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Age: {dog.age ? dog.age : 'Not Listed'}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Breed: {dog.breed}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Color: {dog.color}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Sex: {dog.sex}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Location: {dog.city} {dog.dog_zip_code}
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
                            height: '60px',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                        onClick={() => window.location.href = `mailto:adoption@agency.com?subject=Adoption Inquiry for ${dog.name}`}
                    >
                        CONTACT ADOPTION AGENCY
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
};

export default HomeDogCard;