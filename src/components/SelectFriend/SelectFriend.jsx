import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Material UI imports
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';

function SelectFriend() {

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

  //grab your friends from reducer
  const friendList = useSelector(store => store.friendCourseHistoryReducer);
  // if no friends grab players who have played this course
  const randomPlayerList = useSelector(store => store.randomPlayerReducer);
  // grab the selected course from the reducer
  const selectCourse = useSelector(store => store.selectCourseReducer);
  // local state to store the friend you select
  const [selectedFriend, setSelectedFriend] = useState('');
  // local state to store the random player you select
  const [randomPlayer, setRandomPlayer] = useState('');

  // on load grab your friends and their course history
  useEffect(() => {
    dispatch({
      type: 'FETCH_FRIEND_COURSE_HISTORY',
      payload: {
        courseId: selectCourse.courseId
      }
    })
    // on load grab players who have played this course
    dispatch({
      type: 'FETCH_RANDOM_COURSE_HISTORY',
      payload: {
        courseId: selectCourse.courseId
      }
    })
  }, [])


  const handleClick = (event) => {
    // send the chosen friend and course
    dispatch({
      type: 'SET_FRIEND_COURSE',
      payload: {
        friend: selectedFriend,
        courseId: selectCourse.courseId,
        courseName: selectCourse.courseName,
        holeCount: selectCourse.holeCount,
        friendId: friendList[0].id
      }
    })
    history.push('/gameProgress');
  }

  // send the chosen player and course
  const StartGameWithoutFriend = (event) => {
    event.preventDefault();
    dispatch({
      type: 'SET_FRIEND_COURSE',
      payload: {
        friend: randomPlayer,
        courseId: selectCourse.courseId,
        courseName: selectCourse.courseName,
        holeCount: selectCourse.holeCount,
        friendId: randomPlayerList[0].id
      }
    })
    history.push('/gameProgress');
  }

  // go to Solo Game component
  const startSoloGame = (event) => {
    event.preventDefault();
    history.push('/soloGame');
  }

  let startGameButton = 
  <Button 
    type="submit" 
    variant="contained" 
    color="primary" 
    className={classes.button} 
    onClick={startSoloGame}
  >
    Start Game!
  </Button>

  if (selectedFriend === '') {
    console.log('choose a friend')
  }

  if (friendList[0] === undefined && randomPlayerList[0] === undefined) {
    return (
    <Grid 
      container 
      className={classes.root} 
      spacing={2}
      alignItems="center"
      direction="column"
    >
      <Grid item xs={12}>
        <Typography variant="h5">
          {selectCourse.courseName} 
        </Typography>
      </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
          <FormLabel component="legend">No one else has played this course. Click Start Game to track your score.</FormLabel>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              className={classes.button} 
              onClick={startSoloGame}
            >
              Start Game!
            </Button>
          </FormControl>
        </Grid>
    </Grid>
    )
  }


  if (friendList[0] === undefined) {
    
    return (
      <Grid 
      container 
      className={classes.root} 
      spacing={2}
      alignItems="center"
      direction="column"
    >
    <Grid item xs={12}>
    </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
        <FormLabel component="legend">You don't have a friend who played this course. You can play against a random player below.</FormLabel>
          <Grid item xs={12}>
            <RadioGroup 
              aria-label="Friend" 
              name="friend.id" 
              value={randomPlayer}
              onChange={(event) => setRandomPlayer(event.target.value)} 
            >
              {randomPlayerList.map(player => {
                return (
                  <FormControlLabel 
                    key={player.id}
                    value={player.username}
                    control={<Radio />} 
                    label={player.username}
                  />
                )
              })}
            </RadioGroup>
          </Grid>
          <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              className={classes.button} 
              onClick={StartGameWithoutFriend}
            >
              Start Game!
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
      <Typography variant="h5"> {selectCourse.courseName}</Typography>
    </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
        <FormLabel component="legend">Choose a friend to play against</FormLabel>
          <Grid item xs={12}>
            <RadioGroup 
              aria-label="Friend" 
              name="friend.id" 
              value={selectedFriend}
              onChange={(event) => setSelectedFriend(event.target.value)} 
            >
              {friendList.map(friend => {
                return (
                  <FormControlLabel 
                    key={friend.id}
                    value={friend.username}
                    control={<Radio />} 
                    label={friend.username}
                  />
                )
              })}
            </RadioGroup>
          </Grid>
          <Button 
              type="submit" 
              variant="contained" 
              color="primary" 
              className={classes.button} 
              onClick={handleClick}
          >
              Start Game!
          </Button>
        </FormControl>
    </Grid>
  </Grid>
    )
  }
}
export default SelectFriend;