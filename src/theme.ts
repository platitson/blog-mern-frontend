import { createTheme } from "@mui/material/styles";

const COLORS = {
  main: "#1f2937",
  mainLight: "#2d3c50",
  mainLighter: "#34455d",
  mainTint: "#ebeef4",
  gray: "#626875",
  white: "#fff",
};

export const theme = createTheme({
  palette: {
    primary: {
      main: COLORS.main,
      light: COLORS.mainLighter,
    },
    text: {
      primary: COLORS.main,
      secondary: COLORS.gray,
    },
    background: {
      default: COLORS.white,
    },
  },

  typography: {
    fontFamily: '"Spectral", serif',

    body1: {
      color: COLORS.main,
    },

    body2: {
      color: COLORS.gray,
    },

    h5: {
      fontWeight: 500,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          color: COLORS.main,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },

        contained: {
          backgroundColor: COLORS.main,
          color: COLORS.white,

          "&:hover": {
            backgroundColor: COLORS.mainLight,
          },

          "&:active": {
            backgroundColor: COLORS.mainLighter,
          },
        },

        outlined: {
          color: COLORS.main,
          borderColor: COLORS.main,

          "&:hover": {
            borderColor: COLORS.mainLight,
            backgroundColor: COLORS.mainTint,
          },
        },

        text: {
          color: COLORS.main,

          "&:hover": {
            backgroundColor: COLORS.mainTint,
          },
        },
      },
    },
  },
});
