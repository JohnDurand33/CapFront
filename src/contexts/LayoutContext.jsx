import { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children }) => {
    const [isNavOpen, setNavOpen] = useState(true);
    const [isDogSearchOpen, setDogSearchOpen] = useState(false);

    const toggleNav = () => { setNavOpen(!isNavOpen) };
    const toggleDogSearch = () => {setDogSearchOpen(!isDogSearchOpen)};

        

    return (
        <LayoutContext.Provider value={{ isNavOpen, toggleNav, isDogSearchOpen, toggleDogSearch }}>
            {children}
        </LayoutContext.Provider>
    );
};