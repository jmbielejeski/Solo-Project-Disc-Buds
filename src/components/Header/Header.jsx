import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import Logo from '../../images/logo.png';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Header() {

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 500,
      flexGrow: 1,
    },
    control: {
      padding: 0,
      margin: 1,
    },
    header: {
      position: "relative",
      top: theme.spacing(0),
    },
  }));

  const classes = useStyles();

  const history = useHistory();

  return (
    <Grid
      container 
      className={classes.header} 
      spacing={2}
      alignItems="center"
      direction="column" 
    >
        <img 
          src={Logo}
          alt="Disc Buds Logo"
          onClick={() => {history.push('/homePage')}}

        />
    </Grid>
  )
}

export default Header;
