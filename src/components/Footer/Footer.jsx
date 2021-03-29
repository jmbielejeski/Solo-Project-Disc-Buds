import React from 'react';
import { useHistory } from 'react-router-dom';

import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {

  const useStyles = makeStyles((theme) => ({
    root: {
      maxWidth: 500,
      flexGrow: 1,
    },
    control: {
      padding: theme.spacing(2),
      margin: 'auto',
    },
    appBar: {
      top: 'auto',
      bottom: 0,
      alignItems: "center",
    },
  }));

  const classes = useStyles();

  const history = useHistory();

  return (
    <AppBar position="fixed" color="secondary" className={classes.appBar}>
        <Typography>
          <Link onClick={() => {history.push('/homePage')}}>Disc Buds © 2021</Link>
        </Typography>
        <Typography>
          <Link target="_blank" href="https://www.pdga.com/"> Course data © 2021 PDGA</Link>
        </Typography>
    </AppBar>
  )
}

export default Footer;
