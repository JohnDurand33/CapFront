import { useTheme } from '@emotion/react';
import { Box, Drawer, Typography } from '@mui/material';
import React from 'react';
import { useLayout } from '../contexts/LayoutContext';
import BreedSearchForm from './BreedSearchForm';

const BreedSearchDrawer = ({appBarHeight, myBreeds, setMyBreeds}) => {
    const { isBreedSearchFormOpen, toggleBreedSearchForm } = useLayout();
    const theme = useTheme();

    return (
        <Drawer
            anchor="right"
            open={isBreedSearchFormOpen}
            onClose={toggleBreedSearchForm}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 450,
                    padding: 2,
                    marginTop: `${appBarHeight}px`
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Breed Search
                </Typography>
                <BreedSearchForm myBreeds={myBreeds} setMyBreeds={setMyBreeds} />
            </Box>
        </Drawer>
    );
};

export default BreedSearchDrawer;