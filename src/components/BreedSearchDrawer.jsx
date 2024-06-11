import { useTheme } from '@emotion/react';
import { Box, Drawer, Typography } from '@mui/material';
import React from 'react';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useLayout } from '../contexts/LayoutContext';
import BreedSearchForm from './BreedSearchForm';

const BreedSearchDrawer = ({ appBarHeight }) => {
    const { myBreeds, setMyBreeds } = useDogSearch();
    const { isBreedSearchFormOpen, toggleBreedSearchForm, setBreedSearchFormOpen, isScreen } = useLayout();
    const theme = useTheme();

    return (
        <Drawer
            anchor="right"
            open={isBreedSearchFormOpen}

            sx={{
                '& .MuiDrawer-paper': {
                    width: isScreen === 'phone' ? '100vh' : 450,
                    padding: 2,
                    marginTop: `${appBarHeight}px`
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Breed Search
                </Typography>
                <BreedSearchForm />
            </Box>
        </Drawer>
    );
};

export default BreedSearchDrawer;