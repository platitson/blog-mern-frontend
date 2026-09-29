import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#4361ee",
    },
    text: {
      primary: "#1F2937",
      secondary: "#6B7280",
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
  },
});
