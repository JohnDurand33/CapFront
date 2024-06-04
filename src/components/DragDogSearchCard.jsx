import React from 'react';
import { useDrag } from 'react-dnd';
import DogSearchCard from './DogSearchCard';

const DragDogSearchCard = ({ dog }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'dog',
        item: { dog },
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

export default DragDogSearchCard;