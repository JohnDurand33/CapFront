import React from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';
import api from '../contexts/api';
import { useTheme } from '@mui/material/styles';

const DoggyWalletCard = ({ dog }) => {
    const theme = useTheme();
    const handleContactClick = async () => {
        try {
            const response = await api.get(`/api/get_org_details/${dog.api_id}`);
            const org = response.data;

            const emailBody = `Hello,\n\nI am interested in adopting ${dog.name} (ID: ${dog.api_id}).\n\nThank you!`;
            window.location.href = `mailto:${org.orgEmail}?subject=Adoption Inquiry for ${dog.name}&body=${encodeURIComponent(emailBody)}`;
        } catch (error) {
            console.error('Failed to fetch organization details:', error);
        }
    };

    return (
        <Card sx={{
            display: 'flex', flexDirection: 'column', height: '100%', boxShadow: 6, borderRadius: 4,
            border: `3px solid ${theme.palette.secondary.main}`, overflow: 'hidden', width: '100%', mt: 4, mb: 4
        }}>
            <Grid container>
                <Grid item xs={12}>
                    <CardMedia
                        component="img"
                        alt={dog.name}
                        image={dog.img_url}
                        title={dog.name}
                        sx={{
                            width: '100%',
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
                            height: 60, 
                            background: 'theme.palette.primary.main',
                            fontWeight: 'bold',
                            textAlign: 'center',
                        }}
                        onClick={handleContactClick}
                    >
                        CONTACT ADOPTION AGENCY
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
};

export default DoggyWalletCard;