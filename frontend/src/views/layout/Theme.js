import { createTheme } from "@mui/material";
import GothamBook from "../../assets/fonts/GothamBook.ttf";
import GothamBold from "../../assets/fonts/GothamBold.ttf";
import GothamMedium from "../../assets/fonts/GothamMedium.ttf";

export const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#263642'
        }
    },
    form: {
      label: {},
      input: {},
      formGroupCheckbox: {},
      authButton: {},
    },
    card: {},
    button: {},
    typography: {},
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          @font-face {
            font-family: 'GothamBook';
            font-style: normal;
            font-display: swap;
            src: local('GothamBook'), url(${GothamBook}) format('ttf');
          }
          @font-face {
            font-family: 'GothamBold';
            font-style: normal;
            font-display: swap;
            src: local('GothamBold'), url(${GothamBold}) format('ttf');
          }
          @font-face {
            font-family: 'GothamMedium';
            font-style: normal;
            font-display: swap;
            src: local('GothamMedium'), url(${GothamMedium}) format('ttf');
          }
          body {
            background-color: #F1F3F9 !important;
            font-family: 'GothamBook', sans-serif;
            font-size: 13px;
            font-weight: 350;
          }

          a {
            text-decoration: none !important;
          }
        `,
      },
    },
})

theme.typography.logo = {
  color: '#172B4D',
  fontFamily: '"GothamBold", sans-serif',
  fontSize: 25,
  fontWeight: 700
}

theme.typography.pageTitle = {
  color: '#172B4D',
  fontFamily: '"GothamBold", sans-serif',
  fontSize: 25,
  fontWeight: 700,
  marginBottom: '36px',
  [theme.breakpoints.down('md')]: {
    marginBottom: '20px'
  }
}

theme.typography.contentTitle = {
  color: '#172B4D',
  fontFamily: '"GothamMedium", sans-serif',
  fontSize: 18,
  fontWeight: 500
}

theme.typography.homeTxt = {
  color: '#172B4D',
  fontFamily: '"GothamMedium", sans-serif',
  fontSize: 14,
  fontWeight: 500,
  marginTop: '10px'
}


theme.button.contentHeader = {
  color: '#7764E4',
  fontFamily: 'GothamBook, sans-serif',
  fontSize: 13,
  fontWeight: 350,
  borderColor: '#7764E4',
  '&:hover': {
    color: '#fff',
    backgroundColor: '#7764E4',
    borderColor: '#7764E4'
  }
}

theme.card = {
  flexGrow: 1,
  borderRadius: '10px',
  padding: '18px 0px',
  header: {
    padding: '0px 24px 0px 36px',
    [theme.breakpoints.down('sm')]: {
      padding: '0px 24px 0px 20px'
    }
  }
}

theme.card.header = {
  marginBottom: '5px'
}

theme.form.box = {
  '& label': {
    color: '#172B4D',
    fontFamily: 'GothamBook, sans-serif',
    fontSize: 15,
    fontWeight: 350,
    marginBottom: '10px'
  },
  '& input': {
    color: '#696E7B',
    fontFamily: 'GothamBook, sans-serif',
    fontSize: 16,
    fontWeight: 350,
    '&:focus-visible ': {
      outline: 'unset',
    }
  },
  '& fieldset': {
    borderColor: '#172B4D',
  },
  '& .MuiSelect-select': {
    color: '#696E7B',
    fontFamily: 'GothamBook, sans-serif',
    fontSize: 16,
    fontWeight: 350,
  },
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderWidth: '1px',
    },
    '&.Mui-focused fieldset': {
      borderWidth: '1px',
    },
  }
}

theme.form.formGroupCheckbox = {
  '& .css-fdsd3l-MuiButtonBase-root-MuiCheckbox-root': {
    color: '#7764E4'
  },
  '& .MuiFormControlLabel-label': {
    fontFamily: 'GothamBook, sans-serif',
    fontSize: 10,
    fontWeight: 350,
  }
}

theme.form.authButton = {
  backgroundColor: '#11CDEF',
  '&:hover': {
    backgroundColor: '#11CDEF',
  }
}
