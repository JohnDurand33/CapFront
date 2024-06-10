import React from 'react';
import { Card, CardMedia, CardContent, CardActionArea, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const BreedCard = ({ breed }) => {
    const theme = useTheme();

    return (
        <>
            <Card sx={{ backgroundColor: theme.palette.secondary.main }}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        image={breed.image_link}
                        alt={breed.name}
                        sx={{ width: '100%', aspectRatio: `3/2` }}
                    />
                    <CardContent>
                        <Typography variant="h6" fontWeight="600" textAlign="center">{breed.name}</Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </>
    );
};

export default BreedCard;
