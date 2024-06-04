import { Box } from '@mui/material';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useLayout } from '../contexts/LayoutContext';
import { useLogin } from '../contexts/LoginContext';
import { useDogSearch } from '../contexts/DogSearchContext';
import BreedSearchDrawer from './BreedSearchDrawer';
import NavRail from './NavRail';
import NewAppBar from './NewAppBar';
import FavBreedsRail from './FavBreedsRail';
import DoggyWalletRail from './DoggyWalletRail';

const Layout = ({ toggleMode, mode, appBarRef, appBarHeight }) => {
    const { isNavOpen, isBreedSearchOpen, isFavBreedRailOpen, isDoggyWalletOpen } = useLayout();

    return (
        <>
            <NewAppBar toggleMode={toggleMode} mode={mode} appBarRef={appBarRef} />
            <NavRail toggleMode={toggleMode} mode={mode} appBarHeight={appBarHeight} />
            <BreedSearchDrawer appBarHeight={appBarHeight} />
            <FavBreedsRail />
            <DoggyWalletRail />
            <Box
                component="main"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    height: '100%',
                    mt: 11,
                    pl: (isFavBreedRailOpen || isDoggyWalletOpen) ? '400px' : isNavOpen ? 35 : 10,
                    pr: isBreedSearchOpen ? '400px' : 10,
                    transition: 'padding-left 0.2s ease-in-out, padding-right 0.2s ease-in-out',
                }}>
                <Outlet />
            </Box>
        </>
    );
};

export default Layout;
