import React from 'react';
import { Card, CardMedia, CardContent, CardActionArea, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const BreedCard = ({ dog }) => {
    const theme = useTheme();

    return (
        <>
            <Card sx={{
                backgroundColor: {
                    xs: theme.palette.secondary.main, // Applies background color at the xs breakpoint
                    sm: theme.palette.secondary.light
                }
}}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    image={dog.image_link}
                    alt={dog.name}
                    sx={{ height: "140", width: '100%', aspectRatio: `3/2`}}
                />
                <CardContent >
                    <Typography variant="h6" fontWeight="600"  textAlign="center">{dog.name}</Typography>
                </CardContent>
            </CardActionArea>
        </Card>
        </>
    );
};

export default BreedCard;