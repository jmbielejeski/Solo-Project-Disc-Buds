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

  const friendList = useSelector(store => store.friendListReducer)

  const [friendSearch, setFriendSearch] = useState('');

  useEffect(() => {
    dispatch({
      type: 'FETCH_FRIEND_LIST'
    })
  }, [])

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

  const handleClick = (friendId) => {

    console.log('friendId', friendId)

    dispatch({
      type: 'FETCH_FRIEND_DETAILS',
      payload: {
        friendId
      }
    })
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
              <li key={friend.id} onClick={() => handleClick(friend.id)}>{friend.username}</li>
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