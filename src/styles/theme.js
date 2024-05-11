import { createTheme } from "@mui/material/styles";

const customBorderStyles = {
    borderColor: "#D3D3D3",
    borderWidth: "1px",
    borderStyle: "solid",
};

// Function to generate a theme object based on the mode
const getTheme = (mode) =>
    createTheme({
        palette: {
            mode: mode,
            primary: {
                main: "#4169E1",
                dark: "#3B3B3B",
            },
            secondary: {
                main: "#FFBF00",
                dark: "#9F8949",
            },
            background: {
                default: mode === "dark" ? "#600670" : "#DAE3F3",
                paper: mode === "dark" ? "#888B0E" : "#6975BD",
            },
            text: {
                primary: mode === "dark" ? "#ffffff" : "#000000",
                secondary: mode === "dark" ? "#E0E0E0" : "#444444",
            },
        },
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: customBorderStyles,
                },
            },
            MuiButton: {
                styleOverrides: {
                    outlined: customBorderStyles,
                },
            },
            MuiCard: {
                styleOverrides: {
                    root: customBorderStyles,
                },
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        borderBottom: `1px solid ${customBorderStyles.borderColor}`,
                        backgroundColor:
                            mode === "dark" ? "#7A1B8B" : "#4B5FD2",
                    },
                },
            },
        },
    });

export { getTheme };
