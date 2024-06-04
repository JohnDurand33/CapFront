import React from 'react';
import { useDrag } from 'react-dnd';
import { useTheme } from '@emotion/react';
import BreedCard from './BreedCard';

const DragBreedCard = ({ breed }) => {
    const theme = useTheme();
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
            <BreedCard breed={breed} sx={{ backgroundColor: theme.palette.secondary.main }} />
        </div>
    );
};

export default DragBreedCard;