import { Box } from '@mui/material';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { useLayout } from '../contexts/LayoutContext';
import DogSearchDrawer from './BreedSearchDrawer';
import NavRail from './NavRail';
import NewAppBar from './NewAppBar';

const Layout = ({ toggleMode, mode, appBarRef, appBarHeight }) => {
    const { isNavOpen, isBreedSearchOpen } = useLayout();
    return (
        <>
            <NewAppBar toggleMode={toggleMode} mode={mode} appBarRef={appBarRef} />
            <NavRail toggleMode={toggleMode} mode={mode} appBarHeight={appBarHeight} />
            <DogSearchDrawer appBarHeight={appBarHeight} />
            <Box component="main"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    mt: 11, // Adjust top margin to avoid AppBar overlap
                    pl: isNavOpen ? '240px' : 10, // Adjust margin based on NavRail state
                    pr: isBreedSearchOpen ? '400px' : 10, // Adjust margin based on DogSearchDrawer state
                    transition: 'padding-left 0.2s ease-in-out, padding-right 0.2s ease-in-out',
                }}>
                <Outlet />
            </Box>
        </>
    );
};

export default Layout;
