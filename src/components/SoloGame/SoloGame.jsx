import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'


function SoloGame() {
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
      <div>
        <h2>{selectCourse.courseName}</h2>
        <h3>Hole {currentHole}</h3>
        
        <h4>your score: {yourTotalScore}</h4>
        <button onClick={finishGame}>Finish Game</button>
      </div>
    )
    default:
      return (
        <div>
          <h2>{selectCourse.courseName}</h2>
          <h3>Hole {currentHole}</h3>
          <form onSubmit={handleSubmit}>
            <input 
              type="number" 
              name="Score"
              placeholder="Enter Score"
              value={currentScore}
              onChange={(event) => setCurrentScore(event.target.value)}
              required
            />
            <button>Submit Score</button>
          </form>
          <h4>your score: {yourTotalScore}</h4>
        </div>
      )
  }
}

export default SoloGame;
