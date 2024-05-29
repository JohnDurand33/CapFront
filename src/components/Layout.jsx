import { Box } from '@mui/material';
import React, { useEffect }from 'react';
import { Outlet } from 'react-router-dom';
import { useLayout } from '../contexts/LayoutContext';
import { useLogin } from '../contexts/LoginContext';
import { useDogSearch } from '../contexts/DogSearchContext';
import BreedSearchDrawer from './BreedSearchDrawer';
import NavRail from './NavRail';
import NewAppBar from './NewAppBar';
import FavBreedsRail from './FavBreedsRail';

const Layout = ({ toggleMode, mode, appBarRef, appBarHeight }) => {
    const { myBreeds, userFavBreeds } = useDogSearch();
    const { loggedIn, token } = useLogin();
    const { isNavOpen, isBreedSearchOpen, isFavBreedRailOpen } = useLayout();

    useEffect(() => {
        // Log to see what's actually in myBreeds when it attempts to render
        console.log("Layout myBreeds:", myBreeds);
        console.log('FavBreedsRail: loggedIn status, token, userBreedArray:', loggedIn, token, userFavBreeds);
    }, [myBreeds]);
    return (
        <>
            <NewAppBar toggleMode={toggleMode} mode={mode} appBarRef={appBarRef} />
            <NavRail toggleMode={toggleMode} mode={mode} appBarHeight={appBarHeight} />
            <BreedSearchDrawer appBarHeight={appBarHeight} />
            <FavBreedsRail />
            <Box
                component="main"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    mt: 11, // Adjust top margin to avoid AppBar overlap
                    pl: isNavOpen ? 35 : isFavBreedRailOpen ? '400px' : 10, // Adjust margin based on NavRail state
                    pr: isBreedSearchOpen ? '400px' : 10, // Adjust margin based on DogSearchDrawer state
                    transition: 'padding-left 0.2s ease-in-out, padding-right 0.2s ease-in-out',
                }}>
                <Outlet />
            </Box>
        </>
    );
};

export default Layout;
