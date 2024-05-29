import React, { createContext, useState, useContext } from 'react';

const DogSearchContext = createContext();

export const useDogSearch = () => useContext(DogSearchContext);

export const DogSearchProvider = ({ children }) => {
    const [userWalletDogs, setUserWalletDogs] = useState([]);
    const [userFavBreeds, setUserFavBreeds] = useState([]);
    const [myBreeds, setMyBreeds] = useState([]);

    return (
        <DogSearchContext.Provider value={{ userWalletDogs, setUserWalletDogs, userFavBreeds, setUserFavBreeds, myBreeds, setMyBreeds }}>
            {children}
        </DogSearchContext.Provider>
    );
};

