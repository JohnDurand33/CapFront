import { Box } from '@mui/material';
import React, { useEffect } from 'react';
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
    const { loggedIn, token, setLoggedIn } = useLogin();
    const { isNavOpen, isBreedSearchOpen, isFavBreedRailOpen, setFavBreedRailOpen, setNavOpen } = useLayout();


    useEffect(() => {
        setFavBreedRailOpen(false);
        setNavOpen(true);
    }, []);

    useEffect(() => {
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
                    mt: 11,
                    pl: isFavBreedRailOpen ? '400px' : isNavOpen ? 35 : 10,
                    pr: isBreedSearchOpen ? '400px' : 10,
                    transition: 'padding-left 0.2s ease-in-out, padding-right 0.2s ease-in-out',
                }}>
                <Outlet />
            </Box>
        </>
    );
};

export default Layout;
