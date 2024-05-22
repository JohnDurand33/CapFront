import React, { createContext, useState, useContext } from 'react';

const DogSearchContext = createContext();

export const DogSearchProvider = ({ children }) => {
    const [results, setResults] = useState([]);

    return (
        <DogSearchContext.Provider value={{ results, setResults }}>
            {children}
        </DogSearchContext.Provider>
    );
};

export const useDogSearch = () => useContext(DogSearchContext);