import React from "react";
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ThemeToggleButton = ({ mode, toggleMode }) => {

    const handleToggle = () => {
        toggleMode();
        console.log('ThemeToggleButton: mode:', mode);
    }

    return (
        <>
            <IconButton onClick={handleToggle} color='inherit'>
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
        </>
    );
};

export default ThemeToggleButton;