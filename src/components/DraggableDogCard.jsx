import React from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../ItemTypes";

const withDraggable = (Component, itemType) => {
    return (props) => {
        const [{ isDragging }, drag] = useDrag(() => ({
            type: itemType,
            item: { ...props },
            collect: (monitor) => ({
                isDragging: !!monitor.isDragging(),
            }),
        }));

        return (
            <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
                <Component {...props} />
            </div>
        );
    };
};

export default withDraggable;