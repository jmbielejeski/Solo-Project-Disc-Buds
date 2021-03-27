import React from 'react';
import { useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import {Button} from '@material-ui/core';

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

      <Grid item xs={12}>
        <Button  
          className="btn" 
          variant="contained" 
          color="primary"
          onClick={() => {history.push('/courseSearch')}}
        >
          Start Game
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Button
          className="btn" 
          variant="contained" 
          color="primary"
          onClick={() => {history.push('/friendsList')}}
        >
          Add a friend      
        </Button>
      </Grid>
    </Grid>
  )
}

export default HomePage;