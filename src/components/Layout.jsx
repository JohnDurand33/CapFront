import { Box } from '@mui/material';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useLayout } from '../contexts/LayoutContext';
import BreedSearchDrawer from './BreedSearchDrawer';
import NavRail from './NavRail';
import NewAppBar from './NewAppBar';
import FavBreedsRail from './FavBreedsRail';
import DoggyWalletRail from './DoggyWalletRail';

const Layout = ({ toggleMode, mode, appBarRef, appBarHeight }) => {
    const { isNavOpen, isBreedSearchOpen, isFavBreedRailOpen, isDoggyWalletOpen, screenType, sizeConfig } = useLayout();

    const paddingLeft = () => {
        if (isDoggyWalletOpen) return `calc(${sizeConfig.doggyWalletRailWidth} + 30px)`;
        if (isFavBreedRailOpen) return `calc(${sizeConfig.favBreedsRailWidth} + 30px)`;
        if (isNavOpen) return `calc(${sizeConfig.navRailWidth} + 30px)`;
        return '40px';
    };

    const paddingRight = () => {
        if (isBreedSearchOpen) return `calc(${sizeConfig.breedSearchRailWidth} + 30px)`;
        return '40px';
    }

    return (
        <>
            <NewAppBar toggleMode={toggleMode} mode={mode} appBarRef={appBarRef} />
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
                    width: `calc(100% - ${paddingLeft()} - ${paddingRight()})`,
                    height: '100%',
                    mt: `${appBarHeight}px`,
                    ml: paddingLeft(),
                    mr: paddingRight(),
                    transition: 'margin-left 0.2s ease-in-out, margin-right 0.2s ease-in-out',
                }}
            >
                <Outlet />
            </Box>
        </>
    );
};

export default Layout;