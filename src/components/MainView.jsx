import React from 'react';
import { Box, Grid } from '@mui/material';
import { Routes } from 'react-router-dom';
import {useLayout} from '../contexts/LayoutContext';



const MainView = () => {


    return (
        <>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100vw',
            height: '100vh',
            padding: 3,
            backgroundColor: 'background.default',
        }}>
            <Grid container spacing={2} sx={{ flex: 1 }}>
                <Grid item xs={7}>
                    {/*<SignUpForm />*/}
                </Grid>
                <Grid item xs={4}>
                    {/*<AnotherComponent />*/}
                </Grid>
                <Grid item xs={1}>
                    {/* This Grid item can be used for padding or gutters */}
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ height: '16.67%' }}> {/* 2 out of 12 units */}
                <Grid item xs={12}>
                    <Routes>
                        {/*<Route path="/bottom" element={<BottomComponent />} />*/}
                    </Routes>
                </Grid>
            </Grid>
            </Box>
        </>
    );
}

export default MainView;