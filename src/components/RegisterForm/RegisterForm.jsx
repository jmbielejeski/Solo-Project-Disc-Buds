import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Material UI imports
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {Button, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';

function RegisterForm() {
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

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <form className="formPanel" onSubmit={registerUser}>
      <Typography variant="h5">Register User</Typography>
      {errors.registrationMessage && (
        <h3 className="alert" role="alert">
          {errors.registrationMessage}
        </h3>
      )}
      <div>
        <InputLabel htmlFor="username">
          Username:
        </InputLabel>
          <OutlinedInput
            id="username"
            value={username}
            required
            onChange={(event) => setUsername(event.target.value)}
            margin="dense"
          />
      </div>
      <div>
        <InputLabel htmlFor="password">
          Password:
        </InputLabel>
          <OutlinedInput
            type="password"
            id="password"
            value={password}
            required
            onChange={(event) => setPassword(event.target.value)}
            margin="dense"
          />
      </div>
      <div>
        <Button 
          className="btn" 
          variant="contained" 
          color="primary" 
          type="submit" 
          name="submit" 
          value="Log In" 
          onClick={registerUser} 
        >
          Register
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
