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

function SoloGame() {
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
  // local state to store your current score
  const [currentScore, setCurrentScore] = useState('');
  // local state to store current hole
  const [currentHole, setCurrentHole] = useState(1);
  const [finishGameButton, setFinishGameButton] = useState(false)

  const selectCourse = useSelector(store => store.selectCourseReducer);

// handle submitting a score
const handleSubmit = (event) => {
  event.preventDefault();
  // This is so we can grab the index of the hole from friends course history
  let holeIndex = currentHole-1;
  // display this alert on every hole but the last one
  if(currentHole < selectCourse.holeCount) {
    Swal.fire({
      title: `Hole ${currentHole}:`, 
      text: `you scored a ${currentScore}`,
      confirmButtonText: 'Next hole'
    })
    .then(function() {
      // update totalScore by adding the current score to total score
    setYourTotalScore(Number(yourTotalScore) + Number(currentScore));
  
    // dispatch current hole results so it can be stored in DB
    dispatch({
      type: 'SET_HOLE_RESULT',
      payload: {
        courseId: selectCourse.courseId,
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
    text: `you scored a ${currentScore}`,
    confirmButtonText: 'Finish game' 
  })
  .then(function() {
    setYourTotalScore(Number(yourTotalScore) + Number(currentScore));
    // dispatch current hole results so it can be stored in DB
    dispatch({
      type: 'SET_HOLE_RESULT',
      payload: {
        courseId: selectCourse.courseId,
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
      course: selectCourse.courseName,
      courseId: selectCourse.courseId,
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
          <Typography variang="h5">
            {selectCourse.courseName}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            Hole {currentHole}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">your score: {yourTotalScore} </Typography>
        </Grid>
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
          spacing={2}
          alignItems="center"
          direction="column"
        >
          <Grid item xs={12}>
            <Typography variang="h5">
              {selectCourse.courseName}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6">
              Hole {currentHole}
            </Typography>
          </Grid>
          <FormControl onSubmit={handleSubmit}>
            <Grid item xs={12}>
              <Typography variant="body1">Enter Score: </Typography>
            </Grid>
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
        </Grid>
      )
  }
}

export default SoloGame;
