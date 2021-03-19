import { SquareFootOutlined } from '@material-ui/icons';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';


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
    let holeIndex = currentHole-1;
    if(currentHole < friendAndCourse.holeCount) {
      swal({
        title: `Hole ${currentHole}:`, 
        text: `you scored a ${currentScore}, ${friendAndCourse.friend} scored a ${matchDetails[holeIndex].hole_score}`,
        button: 'Next hole'
      })
      .then(function() {
      setYourTotalScore(Number(yourTotalScore) + Number(currentScore));
      setFriendTotalScore(Number(friendTotalScore) + Number(matchDetails[holeIndex].hole_score));
      setCurrentScore('');
      // change hole to next hole
      setCurrentHole(Number(currentHole) + 1);
    })
  } else {
    swal({
      title: `Hole ${currentHole}:`, 
      text: `you scored a ${currentScore}, ${friendAndCourse.friend} scored a  ${matchDetails[holeIndex].hole_score}`,
      button: 'Finish game'
    })
    .then(function() {
      setYourTotalScore(Number(yourTotalScore) + Number(currentScore));
      setFriendTotalScore(Number(friendTotalScore) + Number(matchDetails[holeIndex].hole_score));
      console.log('your total score', yourTotalScore)
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
      setCurrentScore('');
      history.push('/gameResult');
    })
  }
}

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

export default GameProgress;