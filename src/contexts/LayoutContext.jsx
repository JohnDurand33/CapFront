import { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
    const [isNavOpen, setNavOpen] = useState(false);
    const [isBreedSearchFormOpen, setBreedSearchFormOpen] = useState(false);
    const [isFavBreedRailOpen, setFavBreedRailOpen] = useState(false);
    const [appBarHeight, setAppBarHeight] = useState(0);
    const [isDoggyWalletOpen, setDoggyWalletOpen] = useState(false);

    const handleNavToggle = () => {
        if (isNavOpen) {
            setFavBreedRailOpen(false);
            setDoggyWalletOpen(false);
            setNavOpen(false);
        } else {
            setFavBreedRailOpen(false);
            setDoggyWalletOpen(false);
            setNavOpen(true);
        }
    };

    const handleFavBreedRail = () => {
        if (isFavBreedRailOpen) {
            setFavBreedRailOpen(false)
            setDoggyWalletOpen(false);
            setNavOpen(false);
            return;
        } else {
            setFavBreedRailOpen(true);
            setDoggyWalletOpen(false);
            setNavOpen(false);
        }
    };

    const handleDoggyWallet = () => {
        if (isDoggyWalletOpen) {
            setNavOpen(false);
            setFavBreedRailOpen(false)
            setDoggyWalletOpen(false);
            return;
        } else {
            setNavOpen(false);
            setFavBreedRailOpen(false)
            setDoggyWalletOpen(true);
        }
    };

    return (
        <LayoutContext.Provider value={{
            isNavOpen,
            setNavOpen,
            handleNavToggle,
            isBreedSearchFormOpen,
            setBreedSearchFormOpen,
            isFavBreedRailOpen,
            setFavBreedRailOpen,
            handleFavBreedRail,
            appBarHeight,
            setAppBarHeight,
            isDoggyWalletOpen,
            setDoggyWalletOpen,
            handleDoggyWallet
        }}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayout = () => useContext(LayoutContext);