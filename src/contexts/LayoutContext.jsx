import { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    const [isNavOpen, setNavOpen] = useState(false);
    const [isBreedSearchFormOpen, setBreedSearchFormOpen] = useState(false);
    const [isFavBreedRailOpen, setFavBreedRailOpen] = useState(false);
    const [appBarHeight, setAppBarHeight] = useState(0);
    const [isDoggyWalletOpen, setDoggyWalletOpen] = useState(false);

    const toggleNav = () => {
        setFavBreedRailOpen(false);
        setNavOpen(!isNavOpen);
    }

    const toggleBreedSearchForm = () => setBreedSearchFormOpen
    (!isBreedSearchFormOpen);
    
    const toggleFavBreedRail = () => {
        setNavOpen(false);
        setFavBreedRailOpen(!isFavBreedRailOpen);
    }

    return (
        <LayoutContext.Provider value={{
            isNavOpen,
            setNavOpen,
            toggleNav,
            isBreedSearchFormOpen,
            setBreedSearchFormOpen,
            toggleBreedSearchForm,
            isFavBreedRailOpen,
            setFavBreedRailOpen,
            toggleFavBreedRail,
            appBarHeight,
            setAppBarHeight
        }}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayout = () => useContext(LayoutContext);