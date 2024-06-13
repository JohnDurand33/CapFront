import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';

const DndContext = ({ children }) => {
    const touchBackendOptions = {
        enableMouseEvents: true,
        enableTouchEvents: true,
        delayTouchStart: 0,
    };

    const getBackend = (manager) => {
        if (isMobile) {
            console.log('Using TouchBackend for mobile devices');
            return TouchBackend(manager, {}, touchBackendOptions); // Correct instantiation
        }
        console.log('Using HTML5Backend for non-mobile devices');
        return HTML5Backend;
    };

    return (
        <DndProvider backend={getBackend}>
            {children}
        </DndProvider>
    );
};

export default DndContext;