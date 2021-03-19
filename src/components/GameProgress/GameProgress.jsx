import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function GameProgress() {

  const dispatch = useDispatch();

  const [yourScore, setYourScore] = useState(0);
  const [friendScore, setFriendScore] = useState(0);
  const [currentScore, setCurrentScore] = useState('');
  const [currentHole, setCurrentHole] = useState(1);

  let friendAndCourse = useSelector(store => store.friendCourseReducer);
  let matchDetails = useSelector(store => store.matchDetailsReducer);

  console.log('matchDetails', matchDetails);

  console.log('friendAndCourse', friendAndCourse);

  useEffect(() => {
    dispatch({
      type: 'SELECTED_FRIEND_COURSE',
      payload: friendAndCourse
    })
  })

  const handleSubmit = (event) => {
    event.preventDefault();
    setYourScore(Number(yourScore) + Number(currentScore));
    setCurrentScore('');
    setCurrentHole(Number(currentHole) + 1);
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