import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    // htmlFontSize: '20px',
    // fontSize: 20,
  },
    palette: {
        // type: 'dark',
        primary: {
          main: '#0083FF',
        },
        secondary: {
          light: '#fff',
          main: '#55efc4',
        },
        error: {
          main: '#e74c3c'
        },
        success: {
          main: "#2ecc71"
        },
        contrastThreshold: 3,
        tonalOffset: 0.2,
    },
    overrides: {
        MuiTooltip: {
          tooltip: {
            fontWeight: '300',
            fontSize: '.7rem'
          },
          
        },
        MuiButton: {
          root: {
            padding: '8px 32px',
            borderRadius: '9px'
          },
          label: {
            textTransform: 'capitalize',
            fontSize: '1rem',
            fontWeight: 400,
          }
        }
    },
})

export default theme