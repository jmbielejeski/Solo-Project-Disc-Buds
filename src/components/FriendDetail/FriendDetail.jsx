import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'

// Material UI imports
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function FriendDetail() {
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

  // grab friend details from reducer
  const friendDetails = useSelector(store => store.friendDetailReducer);
  const matchHistory = useSelector(store => store.matchResultsHistoryReducer);

   // navigates back to friends list
  const goBack = () => {
    history.push('/friendsList');
  }

  // local variable to set initial win totals
  let yourWins = 0;
  let friendWins = 0;


  matchHistory.forEach(match => {
    let friendScore = 0;
    let myScore = 0;

    if (match.user_one === friendDetails.friendId) {
      friendScore = match.user_one_score;
      myScore = match.user_two_score;
    } else {
      myScore = match.user_one_score;
      friendScore = match.user_two_score;
    }

    if (myScore < friendScore) {
      yourWins++;
    } else if (friendScore < myScore) {
      friendWins++;
    } else {
      // No-op, tis a tie
    }
  });
  

  // deletes friend relationship from database
  const handleDelete = (friendId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted you will no longer be able to play against this friend",
      icon: "warning",
      confirmButtonText: 'Yes!',
      dangerMode: true,
      showCancelButton: true,

    })
    .then((result) => {
      if (result.value) { 
        Swal.fire({
          title: "friend deleted",
          icon: "success",
        })
        dispatch({
          // sends to friend saga
          type: 'DELETE_FRIEND',
          payload: {
            friendId
          }
        })
        // after deleting friend goes back to friend list view
        history.push('/friendsList');
      } else {
        Swal.fire("Friend not deleted");
      }
  })
}

let winner;
if (yourWins === friendWins) {
  winner = 'You are tied!';
} else if (yourWins > friendWins) {
  winner = 'You are in the lead!'
} else {
  winner = `{friendDetails.friendUsername} is in the lead!`
}

  return (
    <Grid
      container 
      className={classes.root} 
      spacing={2}
      alignItems="center"
      direction="column" 
    >
      <Typography variant="h4">{friendDetails.friendUsername}</Typography>
      <Box m={2}/>
        <Typography variant="h5">
            Stats:        
          </Typography>
        <Box m={1}/>
          Your wins: {yourWins} vs {friendDetails.friendUsername} wins: {friendWins}
          <Box m={1}/>
        <Typography variant="body1">{winner}</Typography>
      <Box m={3}/>
        <Button
          type="submit" 
          variant="contained" 
          color="primary" 
          className={classes.button} 
          onClick={() => handleDelete(friendDetails.friendId)}
        >
          Delete Friend
        </Button>
        <Box m={1}/>
      <Link 
        variant="body1"
        onClick={() => {history.push('/friendsList')}}
      >
        Back
      </Link>
    </Grid>
  )
}

export default FriendDetail;