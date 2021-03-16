import { useState, useEffect } from 'react';

function GameProgress() {

  const [yourScore, setYourScore] = useState(0);
  const [friendScore, setFriendScore] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);

  const handleSubmit = (event) => {
    event.preventDefault();
    setYourScore(Number(yourScore) + Number(currentScore));
    setCurrentScore('');
  }

  return (
    <div>
      <h3>Hole 1</h3>
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
      <h4>your friend's score: {friendScore}</h4>
    </div>
  )
}

export default GameProgress;