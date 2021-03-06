import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
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

function FriendsSearchResults() {

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
  const dispatch = useDispatch();
  const history = useHistory();

  // store friend search from reducer
  const friendSearch = useSelector(store => store.friendReducer);

  // grab friend search results on load
  useEffect(() =>{
    dispatch({
      // sends to friend saga
      type: 'FETCH_FRIEND_SEARCH'
    })
  }, [])

  // Add a friend relationship to the DB
  const addFriend = (userId) => {
    dispatch({
      // sends to friend saga
      type: 'ADD_FRIEND',
      payload: {
        userId
      }
    })
    Swal.fire({
      title: "Friend Added"
    })
  }

  return (
    <Grid
      container 
      className={classes.root} 
      spacing={2}
      alignItems="center"
      direction="column" 
    >
      <Grid item xs={12}>
        <Typography variant="h5">Friend Search Results</Typography>
      </Grid>
      <List>
        {friendSearch.map(friend => {
          return(
            <ListItem key={friend.id}>
              <Grid item xs={12}>
                {friend.username} 
              </Grid>
              <Box m={1}/>
              <Grid item xs={12}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  onClick={() => addFriend(friend.id)}
                >
                  Add
                </Button>
              </Grid>
            </ListItem>        
          )
        })}
      </List>
      <Button 
        type="submit" 
        variant="contained" 
        color="primary"
        onClick={() => {history.push('/friendsList')}}
      >
        Back
      </Button>
    </Grid>
  )
}

export default FriendsSearchResults;