import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { MultiBackend, TouchTransition } from "react-dnd-multi-backend";

export const HTML5toTouch = {
    backends: [
        {
            id: "html5", // Add this line
            backend: HTML5Backend,
        },
        {
            id: "touch", // Add this line
            backend: TouchBackend,
            options: { enableMouseEvents: true },
            preview: true,
            transition: TouchTransition,
        },
    ],
};