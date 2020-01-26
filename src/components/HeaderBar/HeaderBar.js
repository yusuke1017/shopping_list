import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HowTo from '../HowTo/HowTo';

function HeaderBar() {

  const useStyles = makeStyles(theme => ({
    title: {
      flexGrow: 1,
      color: theme.palette.secondary.main,
      fontSize: "1.25rem"
    }
  }));
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar disableGutters={false}>
            <Typography variant="h1" className={classes.title}>SHOPPING LIST</Typography>
            {/* 使い方 */}
            <HowTo />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

export default HeaderBar;
