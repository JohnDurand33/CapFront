import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDogSearch } from '../contexts/DogSearchContext';

const DragAndDropContextComponent = ({ children, myBreeds, setMyBreeds }) => {
    const { userFavBreeds, setUserFavBreeds } = useDogSearch();

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const { source, destination } = result;

        if (source.droppableId === destination.droppableId) {
            if (source.droppableId === 'breedSearch') {
                const updatedBreeds = Array.from(myBreeds);
                const [movedItem] = updatedBreeds.splice(source.index, 1);
                updatedBreeds.splice(destination.index, 0, movedItem);
                setMyBreeds(updatedBreeds);
            } else {
                const updatedFavBreeds = Array.from(userFavBreeds);
                const [movedItem] = updatedFavBreeds.splice(source.index, 1);
                updatedFavBreeds.splice(destination.index, 0, movedItem);
                setUserFavBreeds(updatedFavBreeds);
            }
        } else {
            if (source.droppableId === 'breedSearch' && destination.droppableId === 'userFavBreeds') {
                const updatedBreeds = Array.from(myBreeds);
                const [movedItem] = updatedBreeds.splice(source.index, 1);
                setMyBreeds(updatedBreeds);

                const updatedFavBreeds = Array.from(userFavBreeds);
                updatedFavBreeds.splice(destination.index, 0, movedItem);
                setUserFavBreeds(updatedFavBreeds);
            }
        }
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            {children}
        </DragDropContext>
    );
};

export default DragAndDropContextComponent;