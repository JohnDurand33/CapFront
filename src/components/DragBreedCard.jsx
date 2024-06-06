import React from 'react';
import { useDrag } from 'react-dnd';
import BreedCard from './BreedCard';

const DragBreedCard = ({ breed }) => {
    const [{ isDragging }, drag] = useDrag({
        type: 'breed',
        item: { breed },
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
            <BreedCard breed={breed} />
        </div>
    );
};

export default DragBreedCard;