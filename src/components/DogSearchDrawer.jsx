import React from 'react';
import { Drawer, Box, Typography } from '@mui/material';
import DogSearchForm from './DogSearchForm';
import { useLayout } from '../contexts/LayoutContext';
import { useTheme } from '@emotion/react';

const DogSearchDrawer = ({appBarHeight}) => {
    const { isDogSearchOpen, toggleDogSearch } = useLayout();
    const theme = useTheme();
    console.log(theme);
    console.log(appBarHeight);

    return (
        <Drawer
            anchor="right"
            open={isDogSearchOpen}
            onClose={toggleDogSearch}
            sx={{
                '& .MuiDrawer-paper': {
                    width: 400,
                    padding: 2,
                    marginTop: `${appBarHeight}px`
                },
            }}
        >
            <Box sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                    Dog Search
                </Typography>
                <DogSearchForm />
            </Box>
        </Drawer>
    );
};

export default DogSearchDrawer;