import { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children }) => {
    const [isNavOpen, setNavOpen] = useState(true);
    const [isBreedSearchFormOpen, setBreedSearchFormOpen] = useState(false);
    const [isFavBreedRailOpen, setFavBreedRailOpen] = useState(false);

    const toggleFavBreedRail = () => {
        if (isNavOpen === true) {
            setNavOpen(false);
            setFavBreedRailOpen(true)
        } else {
            setFavBreedRailOpen(!isFavBreedRailOpen);
        }
    };
    const toggleNav = () => { setNavOpen(!isNavOpen) };
    const toggleBreedSearchForm = () => {setBreedSearchFormOpen(!isBreedSearchFormOpen)};

    return (
        <LayoutContext.Provider value={{ isNavOpen, setNavOpen, toggleNav, isBreedSearchFormOpen, setBreedSearchFormOpen, toggleBreedSearchForm, isFavBreedRailOpen, setFavBreedRailOpen, toggleFavBreedRail }}>
            {children}
        </LayoutContext.Provider>
    );
};