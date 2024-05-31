import React, { createContext, useState, useContext } from 'react';

const DogSearchContext = createContext();

export const DogSearchProvider = ({ children }) => {
    const [userWalletDogs, setUserWalletDogs] = useState([]);
    const [userFavBreeds, setUserFavBreeds] = useState([]);
    const [myBreeds, setMyBreeds] = useState([]);
    const [myDogs, setMyDogs] = useState([]);

    const updateBreeds = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/updatebreeds', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fav_breeds: userFavBreeds }),
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const updatedUserFavBreeds = response.json();
            console.log('Updated Favorite Breeds List:', updatedUserFavBreeds);
            setUserFavBreeds(updatedUserFavBreeds);
            console.log('User\'s Favorite breeds updated:')

        } catch (error) {
            console.error('Failed to update favorite breeds:', error);
        }
    }

    

    return (
        <DogSearchContext.Provider value={{ userWalletDogs, setUserWalletDogs, userFavBreeds, setUserFavBreeds, myBreeds, setMyBreeds, myDogs, setMyDogs, updateBreeds}}>
            {children}
        </DogSearchContext.Provider>
    );
};

export const useDogSearch = () => useContext(DogSearchContext);