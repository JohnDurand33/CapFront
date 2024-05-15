import { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export const useLayout = () => useContext(LayoutContext);

export const LayoutProvider = ({ children }) => {
    const [isNavOpen, setNavOpen] = useState(true);

    const toggleNav = () => {
        setNavOpen(!isNavOpen);
    };

    return (
        <LayoutContext.Provider value={{ isNavOpen, toggleNav }}>
            {children}
        </LayoutContext.Provider>
    );
};