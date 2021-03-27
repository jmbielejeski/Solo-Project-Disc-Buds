import React from 'react';
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Swal from 'sweetalert2';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';

function EditProfile() {
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

  const user = useSelector((store) => store.user);

  // hole state for edit view status
  const [changeUserNameView, setChangeUserNameView] = useState('')
  // hold new username input
  const [newUserName, setNewUserName] = useState(user.username);

  // change view to edit
  const handleEditButton = () => {
    setChangeUserNameView('edit')
  }

  // cancel edit view and change back to normal view
  const handleCancel = () => {
    setChangeUserNameView('');
  }

  // save new username to DB
  const handleSave = () => {
    // dispatch new username to saga
    dispatch({
      // sends to userName saga
      type: 'CHANGE_USERNAME',
      payload: {
        newUserName: newUserName,
        userId: user.id
      }
    })
    // go back to normal view after changing username
    setChangeUserNameView('');
  }

  // delete user profile, user's friends, and user's match history
  const deleteButton = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted you will no longer have access to this site and all your info will be lost",
      icon: "warning",
      confirmButtonText: 'Yes!',
      showCancelButton: true,

    })
    .then((result) => {
      if (result.value) { 
        Swal.fire({
          title: "profile deleted",
          icon: "success",
        })
        dispatch({
          type: 'DELETE_PROFILE',
        })
        history.push('/homePage');
      } else {
        Swal.fire("Profile not deleted");
      }
  })
  }

  // Edit view
switch(changeUserNameView) {
  case 'edit':
    return (
      <Grid
        container 
        className={classes.root} 
        spacing={2}
        alignItems="center"
        direction="column" 
      >
        <Typography variant="h5">Edit your profile</Typography>
        <Box m={1}/>
        <InputLabel htmlFor="editUserName">Change username</InputLabel>
        <Box m={1}/>
        <OutlinedInput 
          className={classes.margin}
          type="text" 
          id="editUserName" 
          defaultValue={newUserName} 
          onChange={(event) => setNewUserName(event.target.value)}
          margin="dense"

        />
        <Box m={1}/>
        <Button
          type="submit" 
          variant="contained" 
          color="primary" 
          className={classes.button}
          onClick={handleSave}
        >
          Save
        </Button>
        <Box m={1}/>
        <Button
          type="submit" 
          variant="contained" 
          color="primary" 
          className={classes.button}
          onClick={handleCancel}
        > 
          Cancel
        </Button>
      </Grid>
    )
    default:
        return (
      <Grid
        container 
        className={classes.root} 
        spacing={2}
        alignItems="center"
        direction="column" 
      >
        <Typography variant="h5">Edit your profile</Typography> 
          <Grid item xs>
            <Typography variant="h6">{newUserName}</Typography>
          </Grid>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            className="btn"  
            onClick={handleEditButton}
          >
            Change username
          </Button>
          <Box m={1}/>

        <Button
          type="submit" 
          variant="contained" 
          color="primary" 
          className="btn" 
          onClick={deleteButton}
        >
          Delete profile
        </Button>
        <Box m={1}/>
        <Link 
          component="button"
          variant="body1"
          onClick={() => {history.push('/')}}
        >
          Back
        </Link>
      </Grid>
    )
}
}

export default EditProfile;