import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Material UI imports
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {Button, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function FriendsList() {
  // Material UI
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    control: {
      padding: theme.spacing(0),
      margin: 'auto',
    },
    absolute: {
      position: 'absolute',
      bottom: theme.spacing(2),
      right: theme.spacing(3),
    },
  }));
  
  const classes = useStyles();
  // End Material UI

  const history = useHistory();
  const dispatch = useDispatch();

  // grab users friend list from reducer so we can render it
  const friendList = useSelector(store => store.friendListReducer)

  // local state to hold the text we will be searching for
  const [friendSearch, setFriendSearch] = useState('');

  // on load of page fetch the user's friend list
  useEffect(() => {
    dispatch({
      // sends to friend saga
      type: 'FETCH_FRIEND_LIST'
    })
  }, [])

  // searches for friend that matches the input
  const getSearchResults = (event) => {
    event.preventDefault();
    dispatch({
      // sends to friend saga
      type: 'FETCH_FRIEND_SEARCH',
      payload: {
        friendSearch,
      }
    })
    history.push('/friendsSearchResults')
  }

  // handles clicking on a friend to go to details.
  // takes the friendId to pass and store in a reducer.
  const handleClick = (friendId, friendUsername) => {

    // sends friend ID to reducer to be stored
    dispatch({
      // sends to friend detail reducers
      type: 'SET_FRIEND_DETAILS',
      payload: {
        friendId,
        friendUsername
      }
    })
    dispatch({
      // sends to matchResults saga
      type: 'FETCH_MATCH_RESULTS',
      payload: {
        friendId: friendId
      }
    })
    // sends us to friend detail
    history.push(`/friendDetail/`)
  }

  if (friendSearch === '') {
    return (
      <Grid 
        container 
        className={classes.root} 
        spacing={2}
        alignItems="center"
        direction="column"
      >
        <Grid item xs={12}>
          <Typography variant="h5">Current Friends</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <List>
              {friendList.map(friend => {
                return(
                  <Grid item xs={12}>
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
                      onClick={() => handleClick(friend.id, friend.username)}
                    >
                      Details
                    </Button>
                    </Grid>
                  </ListItem>
                  </Grid>
                )
              })}
            </List>
          </Grid>
          <Box m={1}/>
          <FormControl component="fieldset">
          <FormLabel component="legend">Search for a friend to add</FormLabel> 
          <Box m={1}/>
            <TextField
              required 
              variant="outlined"
              placeholder="Search for friend"
              defaultValue={friendSearch}
              onChange={(event) => setFriendSearch(event.target.value)}
            /> 
            <Box m={1}/> 
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              className={classes.button} 
              onClick={getSearchResults}
              disabled
            >
              Search
            </Button>
          </FormControl>
        </Grid>
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
        <Grid item xs={12}>
          <Typography variant="h5">Current Friends</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid item xs={12}>
            <List>
              {friendList.map(friend => {
                return(
                  <Grid item xs={12}>
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
                      onClick={() => handleClick(friend.id, friend.username)}
                    >
                      Details
                    </Button>
                    </Grid>
                  </ListItem>
                  </Grid>
                )
              })}
            </List>
          </Grid>
          <Box m={1}/>
          <FormControl component="fieldset">
          <FormLabel component="legend">Search for a friend to add</FormLabel> 
          <Box m={1}/>
            <TextField
              required 
              variant="outlined"
              placeholder="Search for friend"
              defaultValue={friendSearch}
              onChange={(event) => setFriendSearch(event.target.value)}
            /> 
            <Box m={1}/> 
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              className={classes.button} 
              onClick={getSearchResults}
            >
              Search
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    )
  }
}
export default FriendsList;