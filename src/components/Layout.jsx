import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useLayout } from '../contexts/LayoutContext';
import BreedSearchDrawer from './BreedSearchDrawer';
import NavRail from './NavRail';
import NewAppBar from './NewAppBar';
import FavBreedsRail from './FavBreedsRail';
import DoggyWalletRail from './DoggyWalletRail';

const Layout = ({ toggleMode, mode, appBarRef, appBarHeight }) => {
    const location = useLocation();
    const { isNavOpen, isFavBreedRailOpen, isDoggyWalletOpen, screenType, sizeConfig } = useLayout();

    const paddingLeft = () => {
        if (location.pathname === '/' || location.pathname === '/home') return '0px';
        if (isNavOpen) return `calc(${sizeConfig.navRailWidth} + 30px)`;
        if (isDoggyWalletOpen) return `calc(${sizeConfig.doggyWalletRailWidth} + 30px)`;
        if (isFavBreedRailOpen) return `calc(${sizeConfig.favBreedsRailWidth} + 30px)`;
        return '30px';
    };


    return (
        <>
            <NewAppBar toggleMode={toggleMode} mode={mode} appBarRef={appBarRef} appBarHeight={appBarHeight} />
            {screenType !== 'phone' && location.pathname  && <NavRail toggleMode={toggleMode} mode={mode} appBarHeight={appBarHeight} />}
            <BreedSearchDrawer appBarHeight={appBarHeight} />
            {isFavBreedRailOpen && <FavBreedsRail />}
            {isDoggyWalletOpen && <DoggyWalletRail />}
            <Box
                appBarHeight={appBarHeight}
                component="main"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%',
                    pt: `${appBarHeight}px`,
                    pl: paddingLeft(),
                    pr: location.pathname === '/home' ? 0 : '30px',
                    transition: 'margin-left 0.5s ease-in-out 0.5s, background-color 0.3s ease',
                }}
            >
                <Outlet />
            </Box>
        </>
    );
};

export default Layout;