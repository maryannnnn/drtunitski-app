import {createTheme} from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#404040',
            dark: '#404040',
            light: '#adacac',
            contrastText: '#dedddd',
        },
        secondary: {
            main: '#323232',
            dark: '#4D4D1A',
            light: '#656565',
            contrastText: '#821936',
        },
        three: {
            main: '#6F7A8B',
            dark: '#999999',
            light: '#989DA5',
            contrastText: '#2c2d2d',
        },
        background: {
            default: '#f5f5f5',
            paper: '#fff',
        },
        text: {
            primary: '#212121',
            secondary: '#757575',
        },
        error: {
            main: '#f44336',
        },
        success: {
            main: '#4caf50',
        },
    },
    typography: {
        fontFamily: 'Montserrat, sans-serif',
        h1: {
            fontSize: '2.5rem',
            fontWeight: 500,
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 500,
        },
        h3: {
            fontSize: '1.5rem',
            fontWeight: 500,
        },
        h4: {
            fontSize: '1.2rem',
            fontWeight: 500,
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            lineHeight: 1.5,
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.5,
        },
    },
    shape: {
        borderRadius: 8,
    },
    spacing: 8,
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    padding: 0,
                    minWidth: 'auto',
                    color: 'inherit',
                    backgroundColor: 'transparent',
                    boxShadow: 'none',
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                },
            },
        },
        MuiPopover: {
            styleOverrides: {
                paper: {
                    backgroundColor: '#e2e2e2',
                    padding: '16px',
                },
            },
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: '#3E2F2C',
                    textDecoration: 'none',
                    '&:hover': {
                        textDecoration: 'underline',
                        color: '#adadad',
                    },
                },
            },
        },
    },
});

export default theme;