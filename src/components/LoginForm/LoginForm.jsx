import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom';

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
import Box from '@material-ui/core/Box';

function LoginForm() {

  // Material UI
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
  inputs: {
    marginBottom: '10rem',
  }
}));

const classes = useStyles();
// End Material UI

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();
  const history = useHistory();


  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
      history.push('/');
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <form className="formPanel" onSubmit={login}>
      {errors.loginMessage && (
        <Typography variant="h3" className="alert" role="alert">
          {errors.loginMessage}
        </Typography>
      )}
      <Grid item xs>
        <InputLabel htmlFor="username">
          Username:
        </InputLabel>
        <Box m={1}/>
          <OutlinedInput
            id="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            margin="dense"
          />
      </Grid>
      <Box m={1}/>
      <Grid item xs>
        <InputLabel htmlFor="password">
          Password:
        </InputLabel>
        <Box m={1}/>
          <OutlinedInput
            className={classes.margin}
            type="password"
            id="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            margin="dense"
          />
      </Grid>
      <Box m={3}/>
      <Grid item xs>
        <Button 
          className="btn" 
          variant="contained" 
          color="primary" 
          type="submit" 
          name="submit" 
          value="Log In" 
          onClick={login}
        >
          Log in
        </Button>
      </Grid>
    </form>
  );
}

export default LoginForm;
