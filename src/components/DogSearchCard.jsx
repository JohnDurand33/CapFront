import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material';

const DogSearchCard = ({ dog }) => {
    return (
        <Card sx={{ maxWidth: 345, m: 2 }}>
            <CardMedia
                component="img"
                alt={dog.name}
                height="140"
                image={dog.img_url}
                title={dog.name}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {dog.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    Age: {dog.age}
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
                    Location: {dog.city_state} ({dog.dog_zip_code})
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary">
                    Learn More
                </Button>
                <Button size="small" color="secondary">
                    Adopt
                </Button>
            </CardActions>
        </Card>
    );
};

export default DogSearchCard;