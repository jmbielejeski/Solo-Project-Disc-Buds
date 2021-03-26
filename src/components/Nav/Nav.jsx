import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Material UI imports
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

function Nav() {

  // material UI
  const useStyles = makeStyles({
    list: {
      width: "225px",
    }
  });

  const classes = useStyles();
  const [drawer, setDrawer] = useState(false);

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };
  
  // End Material UI

  const history = useHistory();

  const user = useSelector((store) => store.user);

  console.log('user is ', user)

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/homePage';
    loginLinkData.text = 'Home';
  }

  let list = (
    <div
      className={classes.list}
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
      role="presentation"
    >
      <List>
        <ListItem>
          <Link 
            component="button"
            variant="body1"
            onClick={() => {history.push('/homePage')}}
          >
            Home
          </Link>
        </ListItem>
        <ListItem>
          <Link 
            component="button"
            variant="body1"
            onClick={() => {history.push('/about')}}
          >
            About
          </Link>
        </ListItem>
      </List>
    </div>
  )
  
  if (user.id != null ) {
    list = (
    <div
      className={classes.list}
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
      role="presentation">
        
      <List>
        <ListItem>
          Welcome {user.username}
        </ListItem>
        <ListItem>
          <Link 
            component="button"
            variant="body1"
            onClick={() => {history.push('/')}}
          >
            Home
          </Link>
        </ListItem>
        <ListItem>
          <Link 
            component="button"
            variant="body1"
            onClick={() => {history.push('/friendsList')}}
          >
            Friends
          </Link>
        </ListItem>
        <ListItem>
          <Link 
            component="button"
            variant="body1"
            onClick={() => {history.push('/editProfile')}}
          >
            Edit profile
          </Link>
        </ListItem>
        <ListItem>
        <Link 
            component="button"
            variant="body1"
            onClick={() => {history.push('/about')}}
          >
            About
          </Link>
        </ListItem>
        <ListItem>
          <LogOutButton className="navLink" />
        </ListItem>
      </List>
    </div>
    )
  } 

  return (
    <div className="nav">
      <IconButton onClick={toggleDrawer}>
        <MenuIcon fontSize="large"/>
      </IconButton>
      <Drawer anchor="left" open={drawer} onClose={toggleDrawer}>
        {list}
      </Drawer>
    </div>
  );
}

export default Nav;

