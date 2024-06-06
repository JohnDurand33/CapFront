import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';

const HomeDogCard = ({ dog }) => (
    <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', boxShadow: 6, borderRadius: 4, border: '2px solid gray', overflow: 'hidden', width: '100%', mt: 4, mb: 4 }}>
        <Grid container>
            <Grid item xs={12}>
                <CardMedia
                    component="img"
                    alt={dog.name}
                    image={dog.img_url}
                    title={dog.name}
                    sx={{
                        width: '100%',
                        height: "140px", 
                        objectFit: 'cover',
                        objectPosition: 'center',
                    }}
                />
            </Grid>
            <Grid item xs={12}>
                <CardContent sx={{ flex: '1 1 auto', textAlign: 'center' }}>
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
                        Location: {dog.city}, {dog.state}
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
                        height: 60, // Static height for Button
                        background: 'theme.palette.primary.main',
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

export default HomeDogCard;