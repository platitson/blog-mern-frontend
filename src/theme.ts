import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1f2937",
      light: "#34455d",
    },
    text: {
      primary: "#1F2937",
      secondary: "#626875",
    },
    background: {
      default: "#fff",
    },
  },

  typography: {
    fontFamily: '"Spectral", serif',

    h1: {
      fontWeight: 500,
    },

    h2: {
      fontWeight: 500,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: "#1F2937",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },

        contained: {
          backgroundColor: "#1f2937",
          color: "#FFFFFF",

          "&:hover": {
            backgroundColor: "#2d3c50",
          },

          "&:active": {
            backgroundColor: "#34455d",
          },
        },

        outlined: {
          color: "#1f2937",
          borderColor: "#1f2937",

          "&:hover": {
            borderColor: "#2d3c50",
            backgroundColor: "#ebeef4",
          },
        },

        text: {
          color: "#1f2937",

          "&:hover": {
            backgroundColor: "#ebeef4",
          },
        },
      },
    },
  },
});
