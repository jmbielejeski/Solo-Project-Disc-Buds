import React from 'react';
import { useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

function HomePage() {
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
  const history = useHistory();

  return (
    <Grid
      container 
      className={classes.root} 
      spacing={2}
      alignItems="center"
      direction="column"
    >
      <Grid item xs={12}>Welcome to Disc Buds!</Grid>
      <Grid item xs={12}>
        <Link  
          component="button"
          variant="body1"
          onClick={() => {history.push('/courseSearch')}}
        >
          Start Game
        </Link>
      </Grid>
      <Grid item xs={12}>
        <Link  
          component="button"
          variant="body1"
          onClick={() => {history.push('/friendsList')}}
        >
          Add a friend      
        </Link>
      </Grid>
    </Grid>
  )
}

export default HomePage;