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
    const backend = isMobile ? TouchBackend(touchBackendOptions) : HTML5Backend;

    return <DndProvider backend={backend}>{children}</DndProvider>;
};

export default DndContext;