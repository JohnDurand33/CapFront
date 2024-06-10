import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';
import useTheme from '@mui/material/styles/useTheme';

const HomeDogCard = ({ dog }) => {
    const theme = useTheme();

    const [orgEmail, setOrgEmail] = useState('');

    const handleFetchOrgDetails = async () => {
        const payload = {
            "apikey": import.meta.env.VITE_RESCUEGROUPS_API_KEY,
            "objectType": "orgs",
            "objectAction": "publicSearch",
            "search": {
                "resultStart": "0",
                "resultLimit": "1",
                "resultSort": "orgID",
                "resultOrder": "asc",
                "filters": [
                    {
                        "fieldName": "orgID",
                        "operation": "equals",
                        "criteria": dog.org_id
                    }
                ],
                "fields": [
                    "orgEmail"
                ]
            }
        };

        const url = 'https://api.rescuegroups.org/http/v2.json';
        const headers = {
            'Content-Type': 'application/json'
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(payload),
                cache: 'no-cache'
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const orgDetails = data.data[Object.keys(data.data)[0]];
            setOrgEmail(orgDetails.orgEmail);

            const emailSubject = `Adoption Inquiry for ${dog.name}`;
            const emailBody = `Hello,

I am interested in adopting ${dog.name} (Animal ID: ${dog.api_id}). Could you please provide more information about the adoption process?

Thank you!`;
            window.location.href = `mailto:${orgDetails.orgEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        } catch (error) {
            console.error('Error fetching organization details:', error);
        }
    };

    return (
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', boxShadow: 6, borderRadius: 4, border: `3px solid ${theme.palette.secondary.main}`, overflow: 'hidden', width: '100%', mt: 4, mb: 4 }}>
            <Grid container sx={{ height: '100%' }}>
                <Grid item xs={12}>
                    <CardMedia
                        component="img"
                        alt={dog.name}
                        image={dog.img_url}
                        title={dog.name}
                        sx={{
                            height: 0,
                            paddingTop: '56.25%', // 16:9 aspect ratio
                            objectFit: 'cover',
                            objectPosition: 'center',
                        }}
                    />
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
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
                            Location: {dog.city}</Typography>
                    </CardContent>
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
                        onClick={handleFetchOrgDetails}
                    >
                        CONTACT ADOPTION AGENCY
                    </Button>
                </Grid>
            </Grid>
        </Card>
    );
};

export default HomeDogCard;