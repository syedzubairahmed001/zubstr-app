import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    // htmlFontSize: '20px',
    // fontSize: 20,
  },
  props: {
    MuiButtonBase: {
      // disableRipple: true,
    }
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
      main: "#0083FF"
    },
    secondary: {
      light: "#fff",
      main: "#55efc4"
    },
    error: {
      main: "#e74c3c"
    },
    success: {
      main: "#2ecc71"
    },
    // text: {
    //   primary: "#333"
    // },
    contrastThreshold: 3,
    tonalOffset: 0.2
  },
  overrides: {
    MuiAppBar:{
      positionFixed: {
        backdropFilter: 'saturate(180%) blur(20px)',
        backgroundColor: 'rgba(255, 255, 255, 0)'
      }
    },
    MuiTooltip: {
      tooltip: {
        fontWeight: "300",
        fontSize: ".7rem",
        backgroundColor: "#333"
      },
      arrow: {
        color: "#333"
      }
    },
    MuiButton: {
      root: {
        padding: "8px 32px",
        borderRadius: "10px"
      },
      label: {
        textTransform: "capitalize",
        fontSize: ".9rem",
        fontWeight: 400
      }
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: "10px"
      }
    },
    MuiPaper: {
      elevation1: {
        boxShadow: '0px 4px 20px rgba(0,0,0,0.05)'
      },
      rounded: {
        borderRadius: "10px"
      }
    },
    MuiFormHelperText: {
      root: {
        minHeight: "0em",
        lineHeight: "0em",
        animation: "input-helperText-animate .1s ease-out  1 both"
      }
    }
    // MuiFilledInput: {
    //   underline: {
    //     borderRadius: "10px"
    //   }
    // }
  }
});

export default theme;

