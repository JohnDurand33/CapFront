import React, { createContext, useState, useContext } from 'react';

const DogSearchContext = createContext();

export const DogSearchProvider = ({ children }) => {
    const [currentDogs, setCurrentDogs] = useState([]);
    const [currentSearchBreeds, setCurrentSearchBreeds] = useState([]);
    const [favBreeds, setFavBreeds] = useState([]);

    return (
        <DogSearchContext.Provider value={{ currentSearchBreeds, setCurrentSearchBreeds, currentDogs, setCurrentDogs, favBreeds, setFavBreeds }}>
            {children}
        </DogSearchContext.Provider>
    );
};

export const useDogSearch = () => useContext(DogSearchContext);