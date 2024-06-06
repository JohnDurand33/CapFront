import React from 'react';
import { useDrag } from 'react-dnd';
import HomeDogCard from './HomeDogCard';

const DragHomeDogCard = ({ dog }) => {
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
            <HomeDogCard dog={dog}/>
        </div>
    );
};

export default DragHomeDogCard;