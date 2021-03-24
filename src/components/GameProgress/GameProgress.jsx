import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'

// Material UI imports
import Grid from '@material-ui/core/Grid';
import {Button, TextField} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import PlusOneIcon from '@material-ui/icons/PlusOne';
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1';
import Typography from '@material-ui/core/Typography';

function GameProgress() {

  // Material UI
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
  textField: {
    width: '10ch',
    autoFocus: 'true',
    textAlign: "center"
  },
  icons: {
    height: '3rem',
  },
}));

const classes = useStyles();
// End Material UI

  const history = useHistory();

  const dispatch = useDispatch();

  // local state to store your total score
  const [yourTotalScore, setYourTotalScore] = useState(0);
  // local state to store friend's total score
  const [friendTotalScore, setFriendTotalScore] = useState(0);
  // local state to store your current score
  const [currentScore, setCurrentScore] = useState('');
  // local state to store current hole
  const [currentHole, setCurrentHole] = useState(1);
  const [finishGameButton, setFinishGameButton] = useState(false)
 // local variable to store hole scores for later sending to DB
  let friendAndCourse = useSelector(store => store.friendCourseReducer);
  // store friends match history from reducer
  let matchDetails = useSelector(store => store.matchDetailsReducer);

  //console.log('matchDetails', matchDetails);
  //console.log('friendAndCourse', friendAndCourse);

  // on load grab friends match history
  useEffect(() => {
    dispatch({
      type: 'SELECTED_FRIEND_COURSE',
      payload: friendAndCourse
    })
  }, [])

  // handle submitting a score
  const handleSubmit = (event) => {
    event.preventDefault();
    // This is so we can grab the index of the hole from friends course history
    let holeIndex = currentHole-1;
    // display this alert on every hole but the last one
    if(currentHole < friendAndCourse.holeCount) {
      Swal.fire({
        title: `Hole ${currentHole}:`, 
        text: `you scored a ${currentScore}, ${friendAndCourse.friend} scored a ${matchDetails[holeIndex].hole_score}`,
        confirmButtonText: 'Next hole'
      })
      .then(function() {
        // update totalScore by adding the current score to total score
      setYourTotalScore(Number(yourTotalScore) + Number(currentScore));
      // update friend's total score by adding the hole score at this hole_index to total score
      setFriendTotalScore(Number(friendTotalScore) + Number(matchDetails[holeIndex].hole_score));
    
      // dispatch current hole results so it can be stored in DB
      dispatch({
        type: 'SET_HOLE_RESULT',
        payload: {
          courseId: friendAndCourse.courseId,
          holeScore: currentScore,
          holeIndex: currentHole
        }
      })
      setCurrentScore('');
      // change hole to next hole
      setCurrentHole(Number(currentHole) + 1);
    })
    // display this sweet alert on the last hole
  } else {
    Swal.fire({
      title: `Hole ${currentHole}:`, 
      text: `you scored a ${currentScore}, ${friendAndCourse.friend} scored a  ${matchDetails[holeIndex].hole_score}`,
      confirmButtonText: 'Finish game' 
    })
    .then(function() {
      setYourTotalScore(Number(yourTotalScore) + Number(currentScore));
      setFriendTotalScore(Number(friendTotalScore) + Number(matchDetails[holeIndex].hole_score));
      console.log('your total score', yourTotalScore, 'friendTotalScore', friendTotalScore)
      // dispatch current hole results so it can be stored in DB
      dispatch({
        type: 'SET_HOLE_RESULT',
        payload: {
          courseId: friendAndCourse.courseId,
          holeScore: currentScore,
          holeIndex: currentHole
        }
      })
      setCurrentScore('');
      setFinishGameButton(true);
      })
    }
  }

  const finishGame = () => {
    dispatch({
      type: 'SET_MATCH_RESULTS',
      payload: {
        yourScore: yourTotalScore,
        friendScore: friendTotalScore,
        friend: friendAndCourse.friend,
        course: friendAndCourse.courseName,
        courseId: friendAndCourse.courseId,
      }
    })
    history.push('/gameResult');
  }

switch(finishGameButton) {
  case true:
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
            {friendAndCourse.courseName}
          </Typography>
        </Grid>
        <Grid item xs={12}>Hole {currentHole}</Grid>
        
        <Grid item xs={12}>your score: {yourTotalScore}</Grid>
        <Grid item xs={12}>{friendAndCourse.friend}'s score: {friendTotalScore}</Grid>
        <Button
          type="submit" 
          variant="contained" 
          color="primary" 
          className={classes.button} 
          onClick={finishGame}
        >
          Finish Game
        </Button>
      </Grid>
    )
    default:
      return (
        <Grid 
          container 
          className={classes.root} 
          spacing={4}
          alignItems="center"
          direction="column"
        >
          <Grid item xs={12}>
            <Typography variant="h5">
              {friendAndCourse.courseName}
            </Typography>
          </Grid>
          <Grid item xs={12}>Hole {currentHole}</Grid>
          <FormControl component="fieldset">
              <Grid item xs={12}>Enter Score:</Grid>
              <Grid item xs={12}>
                <ExposureNeg1Icon className={classes.icons}  onClick={() => setCurrentScore(Number(currentScore) - 1)}/>
                <TextField 
                  className={classes.textField}
                  variant="outlined"
                  value={currentScore}
                  onChange={(event) => setCurrentScore(event.target.value)}
                  type="number"
                  required
                />
                <PlusOneIcon className={classes.icons}  onClick={() => setCurrentScore(Number(currentScore) + 1)}/>
              </Grid>
              
            <Button
              type="submit" 
              variant="contained" 
              color="primary" 
              className={classes.button} 
              onClick={handleSubmit}
            >
              Submit Score
            </Button>
          </FormControl>
          <Grid item xs={12}>
            <Typography variant="body1">your score: {yourTotalScore} </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">{friendAndCourse.friend}'s score: {friendTotalScore} </Typography>
          </Grid>
        </Grid>
      )
  }
}

export default GameProgress;