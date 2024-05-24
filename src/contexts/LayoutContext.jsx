import { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children }) => {
    const [isNavOpen, setNavOpen] = useState(true);
    const [isBreedSearchFormOpen, setBreedSearchFormOpen] = useState(false);

    const toggleNav = () => { setNavOpen(!isNavOpen) };
    const toggleBreedSearchForm = () => {
        setBreedSearchFormOpen(!isBreedSearchFormOpen)
    };

        

    return (
        <LayoutContext.Provider value={{ isNavOpen, toggleNav, isBreedSearchFormOpen, toggleBreedSearchForm }}>
            {children}
        </LayoutContext.Provider>
    );
};