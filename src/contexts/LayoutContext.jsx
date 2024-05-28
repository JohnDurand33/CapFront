import { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children }) => {
    const [isNavOpen, setNavOpen] = useState(true);
    const [isBreedSearchFormOpen, setBreedSearchFormOpen] = useState(false);
    const [isFavBreedRailOpen, setFavBreedRailOpen] = useState(false);

    const openFavBreedRail = () => {
        setNavOpen(false);
        setFavBreedRailOpen(true);
    };
    const toggleNav = () => { setNavOpen(!isNavOpen) };
    const toggleBreedSearchForm = () => {
        setBreedSearchFormOpen(!isBreedSearchFormOpen)
    };

    return (
        <LayoutContext.Provider value={{ isNavOpen, setNavOpen, toggleNav, isBreedSearchFormOpen, setBreedSearchFormOpen, toggleBreedSearchForm, openFavBreedRail }}>
            {children}
        </LayoutContext.Provider>
    );
};