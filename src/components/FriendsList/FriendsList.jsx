import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

// Material UI imports
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {Button, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

function FriendsList() {
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

  // grab users friend list from reducer so we can render it
  const friendList = useSelector(store => store.friendListReducer)

  // local state to hold the text we will be searching for
  const [friendSearch, setFriendSearch] = useState('');

  // on load of page fetch the user's friend list
  useEffect(() => {
    dispatch({
      type: 'FETCH_FRIEND_LIST'
    })
  }, [])

  // searches for friend that match the input
  const getSearchResults = (event) => {
    event.preventDefault();
    console.log('friendSearch', friendSearch)
    dispatch({
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

    console.log('friendId', friendId, friendUsername)

    // sends friend ID to reducer to be stored
    dispatch({
      type: 'SET_FRIEND_DETAILS',
      payload: {
        friendId,
        friendUsername
      }
    })
    // sends us to friend detail
    history.push(`/friendDetail/`)
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
        Current Friends!
      </Grid>
      <Grid item xs={12}>
        <Grid item xs={12}>
          {friendList.map(friend => {
            return(
              <li key={friend.id} onClick={() => handleClick(friend.id, friend.username)}>{friend.username}</li>
            )
          })}
        </Grid>
        <FormControl component="fieldset">
        <FormLabel component="legend">Search for a friend to add</FormLabel> 
          <TextField
            required 
            variant="outlined"
            placeholder="Search for friend"
            defaultValue={friendSearch}
            onChange={(event) => setFriendSearch(event.target.value)}
          />  
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

export default FriendsList;