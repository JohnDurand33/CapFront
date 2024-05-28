import React, { createContext, useState, useContext } from 'react';

const DogSearchContext = createContext();

export const DogSearchProvider = ({ children }) => {
    const [userWalletDogs, setUserWalletDogs] = useState([]);
    const [userFavBreeds, setUserFavBreeds] = useState([]);

    return (
        <DogSearchContext.Provider value={{ userWalletDogs, setUserWalletDogs, userFavBreeds, setUserFavBreeds }}>
            {children}
        </DogSearchContext.Provider>
    );
};

export const useDogSearch = () => useContext(DogSearchContext);