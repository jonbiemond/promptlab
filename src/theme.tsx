import { createTheme } from '@mui/material/styles';

const main = '#343541';
const dark = '#212123';
const light = '#444654';

const theme = createTheme({
  palette: {
    primary: {
      main,
      dark,
      light,
    },
    secondary: {
    //   main: '#D7B389',
    //   dark: '#3F3F47',
    //   light: '#ffffff',
    //   hover: '#CC9F6B',
    },
    background: {
      default: main,
    },
    text: {
        primary: '#000000',
    },
  },
//   typography: {
//     fontFamily: ['Montserrat', 'san-serif'].join(','),
//     fontSize: 12,
//     h1: {
//       fontFamily: ['Montserrat', 'san-serif'].join(','),
//       fontWeight: 800,
//       fontSize: 40,
//     },
//     h2: {
//       fontFamily: ['Montserrat', 'san-serif'].join(','),
//       fontSize: 32,
//     },
//     h3: {
//       fontFamily: ['Montserrat', 'san-serif'].join(','),
//       fontSize: 24,
//     },
//     h4: {
//       fontFamily: ['Montserrat', 'san-serif'].join(','),
//       fontSize: 20,
//     },
//     h5: {
//       fontFamily: ['Montserrat', 'san-serif'].join(','),
//       fontSize: 16,
//     },
//   },
//   buttons: {
//     hover: {
//       backgroundColor: '#f0f0f0',
//       transition: 'background-color 0.3s ease',
//     },
//   },
//   components: {
//     MuiTextField: {
//       styleOverrides: {
//         root: {
//           borderRadius: '4px',
//         },
//       },
//     },
//   },
});

export default theme;