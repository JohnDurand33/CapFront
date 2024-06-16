import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../utils/ItemTypes';

const BreedCard = ({ breed, index }) => {
    const theme = useTheme();
    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.BREED,
        item: { breed },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <Card sx={{ border: `3px solid ${theme.palette.secondary.main}` }}>
                <CardMedia
                    component="img"
                    image={breed.image_link}
                    alt={breed.name}
                    sx={{ width: '100%', aspectRatio: `3/2` }}
                />
                <CardContent>
                    <Typography variant="h6" fontWeight="600" textAlign="center">{breed.name}</Typography>
                    <input type="hidden" value={breed.id} />
                </CardContent>
            </Card>
        </div>
    );
};

export default BreedCard;
