import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    // htmlFontSize: '20px',
    // fontSize: 20,
  },
  props: {
    MuiButtonBase: {
      disableTouchRipple: true,
      focusRipple: true,
    },
  },
  shape: {
    borderRadius: "10px",
  },
  palette: {
    type: "dark",
    // common: { black: "#000", white: "#fff" },
    // background: {
    //   paper: "#424242",
    //   default: "#121212",
    //   level2: "#333",
    //   level1: "#212121"
    // },
    primary: {
      main: "#0083FF",
      light: "#E9F4FF",
      dark: "#0076ED",
    },
    secondary: {
      light: "rgba(0, 231, 162, 0.1)",
      main: "#01D696",
      contrastText: "#fff",
    },
    error: {
      main: "#e74c3c",
    },
    success: {
      main: "#17bf63",
    },
    // text: {
    //   primary: "#333"
    // },
    contrastThreshold: 3,
    tonalOffset: 0.2,
    background: {
      paper: "#242526",
      default: "#2f2f2f",
    },
    common: {
      black: "#222",
      white: "#fff",
    },
    text: {
      primary: "#ddd",
      secondary: "#bbb",
    },
  },
  overrides: {
    MuiAppBar: {
      positionFixed: {
        // backdropFilter: "saturate(180%) blur(20px)",
        backgroundColor: "#242526",
      },
    },
    MuiTooltip: {
      tooltip: {
        // fontWeight: "300",
        fontSize: ".7rem",
        backgroundColor: "#fff",
        color: "#333",
        borderRadius: "5px",
        boxShadow: "0px 0px 10px rgba(255,255,255, 0.1)",
      },
      arrow: {
        color: "#fff",
      },
    },
    MuiButtonBase: {
      root: {
        transition: "all 0.2s !important",
        "&:active": {
          transform: "scale(0.95)",
        },
      },
    },
    MuiButton: {
      label: {
        textTransform: "capitalize",
        fontSize: ".9rem",
        fontWeight: 400,
      },
    },
    MuiPaper: {
      elevation1: {
        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
      },
    },
    MuiFormHelperText: {
      root: {
        minHeight: "0em",
        lineHeight: "0em",
        animation: "input-helperText-animate .1s ease-out  1 both",
      },
    },
  },
});

export default theme;
