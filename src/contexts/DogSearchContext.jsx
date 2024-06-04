import React, { createContext, useState, useContext } from 'react';


const DogSearchContext = createContext();

export const DogSearchProvider = ({ children }) => {
    const [userFavDogs, setUserFavDogs] = useState([]);
    const [userFavBreeds, setUserFavBreeds] = useState([]);
    const [myBreeds, setMyBreeds] = useState([]);
    const [myDogs, setMyDogs] = useState([]);
    const [homeDogs, setHomeDogs] = useState([]);

    const updateBreeds = async () => {
        try {
            const response = api.post('/api/updatebreeds', {
                headers: {
                    Authorization: `Bearer ${token}`,
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
        <DogSearchContext.Provider value={{ userFavDogs, setUserFavDogs, userFavBreeds, setUserFavBreeds, myBreeds, setMyBreeds, myDogs, setMyDogs, updateBreeds, homeDogs, setHomeDogs }}>
            {children}
        </DogSearchContext.Provider>
    );
};

export const useDogSearch = () => useContext(DogSearchContext);