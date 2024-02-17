import { createTheme } from '@mui/material';

const componentsStyle: any = {
  MuiDataGrid: {
    defaultProps: {
      size: 'small'
    },
    styleOverrides: {
      root: {
        'background': 'white',
        '.MuiDataGrid-columnSeparator': { display: 'none' },
        '.MuiDataGrid-cell': {
          'fontSize': '14px',
          '.MuiInputBase-root': {
            fontSize: '14px',
            height: '100%'
          },
          '.MuiInputBase-root, .MuiFormControl-root': {
            margin: 0,
            width: '100%'
          }
        },
        '.MuiDataGrid-row:nth-of-type(odd)': { backgroundColor: 'whitesmoke' }
      }
    }
  }
};
export const defaultTheme = createTheme({
  components: {
    ...componentsStyle,
    MuiTable: {},
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '.fa-regular, [class^="mi-"]': {
            marginRight: '5px',
            color: 'rgb(0 0 0 / 50%)',
            width: '23px'
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-caption': {
            color: '#828282'
          }
        }
      }
    },
    MuiFormControlLabel: {
      styleOverrides: {
        root: {
          '.MuiFormControlLabel-label': {
            // fontSize: '12px'
          }
        }
      }
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          '& .MuiDialog-paper': {
            padding: '5px'
          }
        }
      }
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          padding: '10px'
        }
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: '10px'
        }
      }
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          'marginLeft': '0',
          'marginRight': '0',
          'height': '40px',
          '.fa-regular, [class^="mi-"]': {
            marginRight: '5px',
            color: 'rgb(0 0 0 / 50%)'
          }
        }
      },
      defaultProps: {
        size: 'small'
      }
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          'input.Mui-disabled': {
            backgroundColor: '#0000000f'
          }
        }
      }
    }
  },
  palette: {
    primary: {
      main: 'rgb(30, 167, 253)',
      light: 'rgb(109, 199, 255)',
      dark: 'rgb(20, 118, 179)',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#007c87',
      dark: '#8ADCE1'
    },
    error: {
      main: '#DC3545',
      contrastText: '#FFFFFF'
    },
    success: {
      main: '#28A745'
    },
    warning: {
      main: '#ffc944',
      dark: '#9b7b2b'
    },
    info: {
      main: '#368EEC'
    },
    divider: '#0000001f'
  }
});
