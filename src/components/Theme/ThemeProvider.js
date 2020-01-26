import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#FE6726',
            main: '#DFD4CA'
        },
        secondary: {
            light: '#ECEADF',
            main: '#3F404C'
        },
        error: {
            main: '#FE6726'
        },
        background: {
            default:'#ECEADF'
        },
        text: {
            primary: '#3F404C',
            secondary: '#808080'
        }
    }
});
export default theme;