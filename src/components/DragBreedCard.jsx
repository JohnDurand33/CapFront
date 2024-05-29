import React from 'react';
import { useDrag } from 'react-dnd';
import BreedCard from './BreedCard';

const DragBreedCard = ({ id, dog }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'breed',
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
            <BreedCard dog={dog} />
        </div>
    );
};

export default DragBreedCard;