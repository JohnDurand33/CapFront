import { createTheme } from "@mui/material/styles";

const customBorderStyles = {
    borderColor: "#D3D3D3",
    borderWidth: "1px",
    borderStyle: "solid",
};

const getTheme = (mode) => {
    const validMode = mode === "dark" || mode === "light" ? mode : "light"; 

    return createTheme({
        palette: {
            mode: validMode,
            primary: {
                main: validMode === "dark" ? "#DFC57B" : "#FFC107",
            },
            secondary: {
                main: validMode === "dark" ? "#FFBF00" : "#CC9A00",
            },
            tertiary: {
                main: validMode === "dark" ? "#0d47a1" : "#bbdefb",
            },
            customGrey: {
                main: validMode === "dark" ? "#868686" : "#d9d6d6",
            },
            background: {
                default: validMode === "dark" ? "#424242" : "#F0F0F0",
                paper: validMode === "dark" ? "#616161" : "#FFFFFF",
            },
            text: {
                primary: validMode === "dark" ? "#FFFFFF" : "#212121",
                secondary: validMode === "dark" ? "#BDBDBD" : "#757575",
            },
        },
        typography: {
            h1: {
                color: validMode === "dark" ? "#FFFFFF" : "#212121",
            },
            h2: {
                color: validMode === "dark" ? "#FFFFFF" : "#212121",
            },
            body1: {
                color: validMode === "dark" ? "#FFFFFF" : "#212121",
            },
            body2: {
                color: validMode === "dark" ? "#BDBDBD" : "#757575",
            },
        },
        transitions: {},
        spacing: 8,
        zIndex: {
            appBar: 1200,
            drawer: 1100,
            modal: 1300,
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
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        borderBottom: `1px solid ${
                            validMode === "dark" ? "#BDBDBD" : "#424242"
                        }`,
                        backgroundColor:
                            validMode === "dark" ? "#0d47a1" : "#bbdefb",
                        color: validMode === "dark" ? "#FFFFFF" : "#212121",
                    },
                },
            },
        },
    });
};

export { getTheme };
