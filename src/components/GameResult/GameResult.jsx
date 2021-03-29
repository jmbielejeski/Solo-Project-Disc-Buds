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
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

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
  const dispatch = useDispatch();

  const matchResults = useSelector(store => store.matchResultsReducer);

  // check if we have a friend we are playing against
  // if we don't only show your score
  if (matchResults.friend === undefined) {
    Swal.fire({
      title: 'Results',
      text: `Your score is ${matchResults.yourScore}`
    })
    // check if your score is less than friend's
  } else if (matchResults.yourScore < matchResults.friendScore) {
    Swal.fire({
      title: 'Results',
      text: `You won!`
    })
    // check if your score is greater than friends
  } else if (matchResults.yourScore > matchResults.friendScore) {
    Swal.fire({
      title: 'Results',
      text: `${matchResults.friend} won!`
    })
    // else it is a tie
  } else {
    Swal.fire({
      title: 'Results',
      text: `It's a tie!`
    })
  }

  // save match results to DB
  const saveMatchResults = () => {
    console.log('saveMatchResults')
    dispatch({
      type: 'SET_MATCH_HISTORY',
      payload: {
        friendId: matchResults.friendId,
        yourScore: matchResults.yourScore,
        friendScore: matchResults.friendScore
      }
    })
    history.push('/');
  }

  // if know friend only show your score
  if (matchResults.friend === undefined) {
    return (
      <Grid
        container 
        className={classes.root} 
        spacing={2}
        alignItems="center"
        direction="column"
      >
        <Typography variant="h5">Game Results!</Typography>
        <Typography variant="h6">your score: {matchResults.yourScore}</Typography>
        <Box m={1}/>
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
      <Typography variant="h5">Game Results!</Typography>
      <Typography variant="h6">Your score: {matchResults.yourScore}</Typography>
      <Typography variant="h6">{matchResults.friend}'s score: {matchResults.friendScore}</Typography>
      <Box m={1}/>
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