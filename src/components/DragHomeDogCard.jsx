import React from 'react';
import { useDrag } from 'react-dnd';
import { useTheme } from '@emotion/react';
import HomeDogCard from './HomeDogCard';

const DragHomeDogCard = ({ dog }) => {
    const theme = useTheme();
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
                backgroundColor: theme.palette.background.paper
            }}
        >
            <HomeDogCard dog={dog}/>
        </div>
    );
};

export default DragHomeDogCard;