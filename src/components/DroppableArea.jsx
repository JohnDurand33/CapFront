import { useDrop } from 'react-dnd';

const DroppableArea = ({ id, children, onDrop }) => {
    const [{ isOver }, drop] = useDrop({
        accept: 'breed',
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
            style={{
                border: '2px dashed grey',
                padding: '16px',
                borderRadius: '4px',
                backgroundColor: isOver ? '#e0e0e0' : '#fff',
            }}
        >
            {children}
        </div>
    );
};

export default DroppableArea;