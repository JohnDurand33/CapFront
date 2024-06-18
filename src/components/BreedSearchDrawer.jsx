import { useTheme } from '@emotion/react';
import { Box, Drawer, Typography } from '@mui/material';
import React from 'react';
import { useDogSearch } from '../contexts/DogSearchContext';
import { useLayout } from '../contexts/LayoutContext';
import BreedSearchForm from './BreedSearchForm';

const BreedSearchDrawer = ({ appBarHeight }) => {
    const { isBreedSearchFormOpen } = useLayout(); 
    const theme = useTheme();

    return (
        <Drawer
            anchor="right"
            open={isBreedSearchFormOpen}
            sx={{
                '& .MuiDrawer-paper': {
                    width: '430px', 
                    padding: 2,
                    marginTop: `${appBarHeight}px`,
                    backgroundColor: theme.palette.background.paper,
                    overflowY: 'auto' + '40px',
                    height: `calc(100vh - ${appBarHeight}px)`,
                },
            }}
        >
            <Box sx={{ p: 2, pb: 4 }}>
                <Typography variant="h6" gutterBottom>
                    Breed Search
                </Typography>
                <BreedSearchForm />
            </Box>
        </Drawer>
    );
};

export default BreedSearchDrawer;