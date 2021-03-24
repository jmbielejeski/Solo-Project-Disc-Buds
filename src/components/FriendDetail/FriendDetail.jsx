import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Swal from 'sweetalert2'

// Material UI imports
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

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

  // // store current friend in local state
  // const [currentFriend, setCurrentFriend] = useState('');

  // grab friend details from reducer
  const friendDetails = useSelector(store => store.friendDetailReducer);
  const matchHistory = useSelector(store => store.matchResultsHistoryReducer);

  // on load grab friend details
  // useEffect(() => {
  //   dispatch({
  //     type: 'GRAB_FRIEND_DETAILS'
  //   })

  // }, [])

  //console.log('currentFriend', friendDetails)

  // navigates back to friends list
  const goBack = () => {
    history.push('/friendsList');
  }

  // deletes friend relationship from database
  const handleDelete = (friendId) => {
    console.log('friendId', friendId);
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

  return (
    <Grid
      container 
      className={classes.root} 
      spacing={2}
      alignItems="center"
      direction="column" 
    >
      <h4>Friend Details</h4>
      <Grid item xs={12}>{friendDetails.friendUsername}
      <Grid xs={12}>
        <Typography variant="h5">Head to head record</Typography>
      </Grid>
        <Button
          type="submit" 
          variant="contained" 
          color="primary" 
          className={classes.button} 
          onClick={() => handleDelete(friendDetails.friendId)}
        >
          Delete
        </Button>
      </Grid>
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