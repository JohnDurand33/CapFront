import React, { createContext, useContext, useState, useEffect } from 'react';

const LayoutContext = createContext();

const breakpoints = {
    phone: 480,
    tablet: 1024,
    laptop: 1440,
    largeLaptop: 1600,
    desktop: 1920,
};

const getScreenType = (width) => {
    if (width <= breakpoints.phone) {
        return 'phone';
    } else if (width <= breakpoints.tablet) {
        return 'tablet';
    } else if (width <= breakpoints.laptop) {
        return 'laptop';
    } else if (width <= breakpoints.largeLaptop) {
        return 'largeLaptop';
    } else {
        return 'desktop';
    }
};

const sizeConfigs = {
    phone: {
        navRailWidth: '60px',
        favBreedsRailWidth: '140px',
        doggyWalletRailWidth: '140px',
        gridTemplateColumns: 'repeat(1, 1fr)',
        spacing: 1,
        getMaxCardWidth: (isFavBreedRailOpen, isDoggyWalletOpen) => {
            const railWidth = isFavBreedRailOpen ? sizeConfigs.phone.favBreedsRailWidth : isDoggyWalletOpen ? sizeConfigs.phone.doggyWalletRailWidth : '0px';
            return `calc(100vw - ${railWidth} - 40px)`;
        },
        cardHeight: '500px'
    },
    tablet: {
        navRailWidth: '60px',
        favBreedsRailWidth: '250px',
        doggyWalletRailWidth: '250px',
        gridTemplateColumns: 'repeat(2, 1fr)',
        spacing: 2,
        getMaxCardWidth: (isFavBreedRailOpen, isDoggyWalletOpen) => {
            const railWidth = isFavBreedRailOpen ? sizeConfigs.tablet.favBreedsRailWidth : isDoggyWalletOpen ? sizeConfigs.tablet.doggyWalletRailWidth : '0px';
            return `calc((100vw - ${railWidth} - 40px) / 2)`;
        },
        cardHeight: '500px'
    },
    laptop: {
        navRailWidth: '200px',
        favBreedsRailWidth: '300px',
        doggyWalletRailWidth: '300px',
        gridTemplateColumns: 'repeat(3, 1fr)',
        spacing: 3,
        getMaxCardWidth: (isFavBreedRailOpen, isDoggyWalletOpen) => {
            const railWidth = isFavBreedRailOpen ? sizeConfigs.laptop.favBreedsRailWidth : isDoggyWalletOpen ? sizeConfigs.laptop.doggyWalletRailWidth : '0px';
            return `calc((100vw - ${railWidth} - 40px) / 3)`;
        },
        cardHeight: '600px'
    },
    largeLaptop: {
        navRailWidth: '220px',
        favBreedsRailWidth: '320px',
        doggyWalletRailWidth: '320px',
        gridTemplateColumns: 'repeat(4, 1fr)',
        spacing: 3,
        getMaxCardWidth: (isFavBreedRailOpen, isDoggyWalletOpen) => {
            const railWidth = isFavBreedRailOpen ? sizeConfigs.largeLaptop.favBreedsRailWidth : isDoggyWalletOpen ? sizeConfigs.largeLaptop.doggyWalletRailWidth : '0px';
            return `calc((100vw - ${railWidth} - 40px) / 4)`;
        },
        cardHeight: '650px'
    },
    desktop: {
        navRailWidth: '240px',
        favBreedsRailWidth: '400px',
        doggyWalletRailWidth: '400px',
        gridTemplateColumns: 'repeat(5, 1fr)',
        spacing: 4,
        getMaxCardWidth: (isFavBreedRailOpen, isDoggyWalletOpen) => {
            const railWidth = isFavBreedRailOpen ? sizeConfigs.desktop.favBreedsRailWidth : isDoggyWalletOpen ? sizeConfigs.desktop.doggyWalletRailWidth : '0px';
            return `calc((100vw - ${railWidth} - 40px) / 5)`;
        },
        cardHeight: '700px'
    }
};


export const LayoutProvider = ({ children }) => {
    const [isNavOpen, setNavOpen] = useState(false);
    const [isBreedSearchFormOpen, setBreedSearchFormOpen] = useState(false);
    const [isFavBreedRailOpen, setFavBreedRailOpen] = useState(false);
    const [appBarHeight, setAppBarHeight] = useState(0);
    const [isDoggyWalletOpen, setDoggyWalletOpen] = useState(false);
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const [screenType, setScreenType] = useState(getScreenType(window.innerWidth));

    useEffect(() => {

        const updateScreenSize = () => {
            const width = window.innerWidth;
            const height = window.innerHeight;
            setScreenSize({ width, height });
            setScreenType(getScreenType(width));
        };

        window.addEventListener('resize', updateScreenSize);

        updateScreenSize();

        return () => {
            window.removeEventListener('resize', updateScreenSize);
        };

    }, []);



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

    const handleBreedSearchForm = () => {
        setBreedSearchFormOpen(prevState => !prevState);
    };

    return (
        <LayoutContext.Provider value={{
            isNavOpen,
            setNavOpen,
            handleNavToggle,
            isBreedSearchFormOpen,
            setBreedSearchFormOpen,
            handleBreedSearchForm,
            isFavBreedRailOpen,
            setFavBreedRailOpen,
            handleFavBreedRail,
            isDoggyWalletOpen,
            setDoggyWalletOpen,
            handleDoggyWallet,
            appBarHeight,
            setAppBarHeight,
            screenType,
            screenSize,
            sizeConfig: sizeConfigs[screenType] || sizeConfigs.desktop,
        }}>
            {children}
        </LayoutContext.Provider>
    );
};

export const useLayout = () => useContext(LayoutContext);