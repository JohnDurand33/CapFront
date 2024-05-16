import { createTheme } from "@mui/material/styles";

const customBorderStyles = {
    borderColor: "#D3D3D3",
    borderWidth: "1px",
    borderStyle: "solid",
};


const getTheme = (mode) =>
    createTheme({
        palette: {
            mode: mode,
            primary: {
                main: mode === "dark" ? "#708090" : "#FFC107",
                dark: mode === "dark" ? "#505A65" : "#FFB300",
            },
            secondary: {
                main: "#FFBF00",
                dark: "#CC9A00",
            },
            background: {
                default: mode === "dark" ? "#424242" : "#F0F0F0",
                paper: mode === "dark" ? "#616161" : "#FFFFFF",
            },
            text: {
                primary: mode === "dark" ? "#FFFFFF" : "#212121",
                secondary: mode === "dark" ? "#BDBDBD" : "#757575",
            },
            transitions: {},
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
                        borderBottom: `1px solid ${
                            mode === "dark" ? "#BDBDBD" : "#424242"
                        }`,
                        backgroundColor:
                            mode === "dark" ? "#0d47a1" : "#bbdefb",
                        color: mode === "dark" ? "#FFFFFF" : "#212121",
                    },
                },
            },
        },
        spacing: 8,
        zIndex: {
            appBar: 1200,
            drawer: 1100,
            modal: 1300,
        },
    });

export { getTheme };
