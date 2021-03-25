import { SquareFootOutlined } from '@material-ui/icons';
import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'

// Material UI imports
import Grid from '@material-ui/core/Grid';
import {Button} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

function GameResult() {

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

  const matchResults = useSelector(store => store.matchResultsReducer);

  console.log('matchResults', matchResults);

  if (matchResults.friend === undefined) {
    Swal.fire({
      title: 'Results',
      text: `Your score is ${matchResults.yourScore}`
    })
  } else if (matchResults.yourScore < matchResults.friendScore) {
    Swal.fire({
      title: 'Results',
      text: `You won!`
    })
  } else if (matchResults.yourScore > matchResults.friendScore) {
    Swal.fire({
      title: 'Results',
      text: `${matchResults.friend} won!`
    })
  } else {
    Swal.fire({
      title: 'Results',
      text: `It's a tie!`
    })
  }

  const saveMatchResults = () => {
    console.log('saveMatchResults')
  }

  if (matchResults.friend === undefined) {
    return (
      <Grid
        container 
        className={classes.root} 
        spacing={2}
        alignItems="center"
        direction="column"
      >
        <Grid item xs={12}>Game Results!</Grid>
        <Grid item xs={12}>your score: {matchResults.yourScore}</Grid>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            className={classes.button}           
            onClick={() => {history.push('/')}}
          >
            Home page
          </Button>
        </Grid>
    )
  } else {

  return (
    <Grid        
      container 
      className={classes.root} 
      spacing={2}
      alignItems="center"
      direction="column"
    >
      <Grid item xs={12}>Game Results!</Grid>
      <Grid item xs={12}>Your score: {matchResults.yourScore}</Grid>
      <Grid item xs={12}>{matchResults.friend}'s score: {matchResults.friendScore}</Grid>
      <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        className={classes.button}           
        onClick={saveMatchResults}
      >
        Home page
      </Button>
    </Grid>
  )
  }
}

export default GameResult;