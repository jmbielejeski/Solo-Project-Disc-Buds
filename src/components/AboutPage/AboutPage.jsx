import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  // Material UI
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
}));

const classes = useStyles();
// End Material UI

  return (
    <Grid
      container 
      className={classes.root} 
      spacing={2}
      alignItems="center"
      direction="column"
    >
      <Grid item xs={12}>
        <Typography variant="h5">Welcome to Disc Buds</Typography>
      </Grid>
      <Grid item xs={9}>
        <Typography 
          variant="body1"
        >
          Disc Buds is a competitive disc golf app. You play disc golf against your friend's match history and compete against them even when you can't be on the course at the same time.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default AboutPage;
