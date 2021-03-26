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
      <Typography variant="h5">Login</Typography>
      {errors.loginMessage && (
        <Typography variant="h3" className="alert" role="alert">
          {errors.loginMessage}
        </Typography>
      )}
      <Grid item xs={12}>
        <InputLabel htmlFor="username">
          Username:
        </InputLabel>
          <OutlinedInput
            id="username"
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            margin="dense"
          />
      </Grid>
      <Grid item xs={12}>
        <InputLabel hrmlFor="password">
          Password:
        </InputLabel>
          <OutlinedInput
            type="password"
            id="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            margin="dense"
          />
      </Grid>
      <Grid item xs={12}>
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
