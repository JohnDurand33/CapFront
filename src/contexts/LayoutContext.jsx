import { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children }) => {
    const [isNavOpen, setNavOpen] = useState(true);
    const [isBreedSearchFormOpen, setBreedSearchFormOpen] = useState(false);
    const [isFavBreedRailOpen, setIsFavBreedRailOpen] = useState(false);

    const startFavBreedRail = () => {
        setIsBreedsRailOpen(true);
        setNavOpen(false);
    };
    const toggleNav = () => { setNavOpen(!isNavOpen) };
    const toggleBreedSearchForm = () => {
        setBreedSearchFormOpen(!isBreedSearchFormOpen)
    };

    return (
        <LayoutContext.Provider value={{ isNavOpen, setNavOpen, toggleNav, isBreedSearchFormOpen, setBreedSearchFormOpen, toggleBreedSearchForm, startFavBreedRail }}>
            {children}
        </LayoutContext.Provider>
    );
};