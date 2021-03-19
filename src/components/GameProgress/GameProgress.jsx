import { SquareFootOutlined } from '@material-ui/icons';
import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';


function GameProgress() {

  const dispatch = useDispatch();

  // local state to store your total score
  const [yourScore, setYourScore] = useState(0);
  // local state to store friend's total score
  const [friendScore, setFriendScore] = useState(0);
  // local state to store your current score
  const [currentScore, setCurrentScore] = useState('');
  // local state to store current hole
  const [currentHole, setCurrentHole] = useState(1);

  // grab friend and course data from reducer to send to saga
  let friendAndCourse = useSelector(store => store.friendCourseReducer);
  // store friends match history from reducer
  let matchDetails = useSelector(store => store.matchDetailsReducer);

  console.log('matchDetails', matchDetails);
  console.log('friendAndCourse', friendAndCourse);

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
    console.log('matchDetails', matchDetails[0]);
    swal({
      title: `Hole ${currentHole}:`, 
      text: `you scored a ${currentScore}, ${friendAndCourse.friend} scored a  ${matchDetails[holeIndex].hole_score}`,
      button: 'Next hole'
    })
    .then(function() {
    setYourScore(Number(yourScore) + Number(currentScore));
    setFriendScore(Number(friendScore) + Number(matchDetails[holeIndex].hole_score));
    setCurrentScore('');
    setCurrentHole(Number(currentHole) + 1);
  })
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
        />
        <button>Submit Score</button>
      </form>
      <h4>your score: {yourScore}</h4>
      <h4>{friendAndCourse.friend}'s score: {friendScore}</h4>
    </div>
  )
}

export default GameProgress;