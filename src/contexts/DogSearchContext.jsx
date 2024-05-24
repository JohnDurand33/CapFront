import React, { createContext, useState, useContext } from 'react';

const DogSearchContext = createContext();

export const DogSearchProvider = ({ children }) => {
    // const [results, setResults] = useState([]);
    const [currentSearchBreeds, setCurrentSearchBreeds] = useState([]);


    const addToCurrentSearchBreeds = (breed) => {
        setCurrentSearchBreeds((prev) => [...prev, breed]);
    }

    const removeFromCurrentSearchBreeds = (breed) => {
        setCurrentSearchBreeds((prev) => prev.filter((b) => b !== breed));
        }


    return (
        <DogSearchContext.Provider value={{ currentSearchBreeds, setCurrentSearchBreeds }}>
            {children}
        </DogSearchContext.Provider>
    );
};

export const useDogSearch = () => useContext(DogSearchContext);