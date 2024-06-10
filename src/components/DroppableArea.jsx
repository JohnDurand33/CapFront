import React from 'react';
import { useDrop } from 'react-dnd';

const DroppableArea = ({ id, children, onDrop, className, acceptType }) => {
    const [{ isOver }, drop] = useDrop({
        accept: acceptType,
        drop: (item, monitor) => {
            console.log('Item dropped in DroppableArea:', item);
            if (onDrop) {
                onDrop(item, monitor);
            }
            return undefined;
        },
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    });

    return (
        <div
            ref={drop}
            className={className}
        >
            {children}
        </div>
    );
};

export default DroppableArea;