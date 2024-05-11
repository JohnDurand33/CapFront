import React from "react";
import { Button } from "@mui/material";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggler = () => {
    const { mode, toggleTheme } = useTheme();

    return (
        <Button onClick={toggleTheme}>
            {mode === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
        </Button>
    );
};

export default ThemeToggler;