import { SquareFootOutlined, SwapCallsSharp } from '@material-ui/icons';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'


function GameProgress() {

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
      <div>
        <h2>{friendAndCourse.courseName}</h2>
        <h3>Hole {currentHole}</h3>
        
        <h4>your score: {yourTotalScore}</h4>
        <h4>{friendAndCourse.friend}'s score: {friendTotalScore}</h4>
        <button onClick={finishGame}>Finish Game</button>
      </div>
    )
    default:
      return (
        <div>
          <h2>{friendAndCourse.courseName}</h2>
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
          <h4>{friendAndCourse.friend}'s score: {friendTotalScore}</h4>
        </div>
      )
  }
}

export default GameProgress;