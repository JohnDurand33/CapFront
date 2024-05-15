import React from "react";
import { Button } from "@mui/material";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggler = () => {
    const { mode, toggleTheme } = useTheme();

    if (!toggleTheme) {
        console.error('toggleTheme is not available from useTheme()');
    }

    return (
        <Button onClick={toggleTheme} sx={{ zIndex: 1300 }}>
            {mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Button>
    );
};

export default ThemeToggler;