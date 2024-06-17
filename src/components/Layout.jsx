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
        if (isDoggyWalletOpen) return `calc(${sizeConfig.doggyWalletRailWidth} + 30px)`;
        if (isFavBreedRailOpen) return `calc(${sizeConfig.favBreedsRailWidth} + 30px)`;
        if (isNavOpen) return `calc(${sizeConfig.navRailWidth} + 30px)`;
        return '30px';
    };


    return (
        <>
            <NewAppBar toggleMode={toggleMode} mode={mode} appBarRef={appBarRef} appBarHeight={appBarHeight} />
            {screenType !== 'phone' && <NavRail toggleMode={toggleMode} mode={mode} appBarHeight={appBarHeight} />}
            <BreedSearchDrawer appBarHeight={appBarHeight} />
            {isFavBreedRailOpen && <FavBreedsRail />}
            {isDoggyWalletOpen && <DoggyWalletRail />}
            <Box
                component="main"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    width: '100%',
                    mt: `${appBarHeight}px`,
                    pl: paddingLeft(),
                    mr: '30px',
                    transition: 'margin-left 0.2s ease-in-out, margin-right 0.2s ease-in-out',
                }}
            >
                <Outlet />
            </Box>
        </>
    );
};

export default Layout;