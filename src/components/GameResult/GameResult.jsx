import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function GameResult() {

  const matchResults = useSelector(store => store.matchResultsReducer);

  console.log('matchResults'. matchResults);

  return (
    <div>
      <h2>Game Results</h2>
    </div>
  )
}

export default GameResult;