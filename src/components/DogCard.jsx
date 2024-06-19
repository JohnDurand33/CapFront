import { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../utils/ItemTypes';
import api from '../contexts/api';
import OrgDetailsModal from './OrgDetailsModal';

const DogCard = ({ dog, index }) => {
    const theme = useTheme();
    const [isModalOpen, setModalOpen] = useState(false);
    const [organizationDetails, setOrganizationDetails] = useState(null);

    const [{ isDragging }, drag] = useDrag(() => ({
        type: ItemTypes.DOG,
        item: { dog },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    const handleModalOpen = async (dog) => {
        try {
            const response = await api.post('/api/get_org_details', { dog_id: dog.api_id });
            setOrganizationDetails(response.data.organization);
            setModalOpen(true);
        } catch (error) {
            console.error('Error fetching organization details:', error);
        }
    };

    const handleModalClose = () => setModalOpen(false);

    return (
        <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
            <Card sx={{ border: `3px solid ${theme.palette.secondary.main}` }}>
                <Grid container>
                    <Grid item xs={12}>
                        <CardMedia
                            component="img"
                            alt={dog.name}
                            image={dog.img_url}
                            title={dog.name}
                            sx={{
                                height: "100%",
                                objectFit: 'cover',
                                objectPosition: 'center',
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
                        <CardContent sx={{ flex: '1 1 auto', textAlign: 'center' }}>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold', color: theme.palette.text.primary }}>
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
                            <Button
                                size="large"
                                variant="contained"
                                color="primary"
                                sx={{
                                    borderRadius: 0,
                                    width: '100%',
                                    height: 60,
                                    background: theme.palette.primary.main,
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    marginTop: 2,
                                }}
                                onClick={() => handleModalOpen(dog)}
                            >
                                CONTACT ADOPTION AGENCY
                            </Button>
                        </CardContent>
                    </Grid>
                </Grid>
            </Card>
            <OrgDetailsModal
                open={isModalOpen}
                handleClose={handleModalClose}
                orgDetails={organizationDetails}
                dogName={dog.name}
                dogApiId={dog.api_id}
            />
        </div>
    );
};

export default DogCard;