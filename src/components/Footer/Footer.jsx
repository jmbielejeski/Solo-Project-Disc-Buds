import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

function Footer() {

  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 500,
      flexGrow: 1,
    },
    control: {
      padding: theme.spacing(2),
      margin: 'auto',
    },
    footer: {
      position: "fixed",
      bottom: theme.spacing(4),
    },
  }));

  const classes = useStyles();

  const history = useHistory();

  return (
    <Grid
      container 
      className={classes.footer} 
      spacing={2}
      alignItems="center"
      direction="column" 
    >
      <Grid item xs={12}>
        <Typography>
          <Link onClick={() => {history.push('/homePage')}}>Disc Buds</Link>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          <Link target="_blank" href="https://www.pdga.com/"> Course data © 2021 PDGA</Link>
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Footer;
