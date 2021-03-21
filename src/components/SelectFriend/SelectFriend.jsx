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

  const friendList = useSelector(store => store.friendCourseHistoryReducer);

  const randomPlayerList = useSelector(store => store.randomPlayerReducer);

  const selectCourse = useSelector(store => store.selectCourseReducer);

  const [selectedFriend, setSelectedFriend] = useState('');

  const [randomPlayer, setRandomPlayer] = useState('');

  useEffect(() => {
    dispatch({
      type: 'FETCH_FRIEND_COURSE_HISTORY',
      payload: {
        courseId: selectCourse.courseId
      }
    })
    dispatch({
      type: 'FETCH_RANDOM_COURSE_HISTORY',
      payload: {
        courseId: selectCourse.courseId
      }
    })
  }, [])

  console.log('friendList', friendList[0])


  const handleClick = (event) => {
    event.preventDefault();
    console.log('clicked button', selectedFriend);
    console.log('selectCourse is ', selectCourse);
    console.log('friendList is ', friendList);

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

  const StartGameWithoutFriend = (event) => {
    event.preventDefault();
    console.log('in StartGameWithoutFriend')
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

  const startSoloGame = (event) => {
    event.preventDefault();
    console.log('starting solo game');
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
        {selectCourse.courseName} 
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
      {selectCourse.courseName} 
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
              onClick={startSoloGame}
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
      {selectCourse.courseName} 
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
              onClick={startSoloGame}
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