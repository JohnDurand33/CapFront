import React from 'react';
import { useDrag } from 'react-dnd';

const DragSearchDogCard = ({ id, dog }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'searchdog',
        item: { id, dog },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    });

    return (
        <div
            ref={drag}
            style={{
                opacity: isDragging ? 0.5 : 1,
                cursor: 'move',
            }}
        >
            <DogSearchCard dog={dog} />
        </div>
    );
};

export default DragSearchDogCard;