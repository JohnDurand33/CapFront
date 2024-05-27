import React from 'react';
import { Card, CardMedia, CardContent, CardActionArea, Typography } from '@mui/material';

const BreedCard = ({ dog }) => {

    return (
        <Card>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={dog.image_link}
                    alt={dog.name}
                    sx={{ height: "140", width: '100%', aspectRatio: `3/2` }}
                />
                <CardContent>
                    <Typography variant="h6">{dog.name}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};

export default BreedCard;