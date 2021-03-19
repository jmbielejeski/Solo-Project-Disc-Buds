import { SquareFootOutlined } from '@material-ui/icons';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';

function GameResult() {

  const matchResults = useSelector(store => store.matchResultsReducer);

  console.log('matchResults', matchResults);

  if (matchResults.yourScore > matchResults.friendScore) {
    swal({
      title: 'Results',
      text: `You won!`
    })
  } else if (matchResults.yourScore < matchResults.friendScore) {
    swal({
      title: 'Results',
      text: `${matchResults.friend} won!`
    })
  } else {
    swal({
      title: 'Results',
      text: `It's a tie!`
    })
  }

  return (
    <div>
      <h2>Game Results!</h2>
      <h4>your score: {matchResults.yourScore}</h4>
      <h4>{matchResults.friend}'s score: {matchResults.friendScore}</h4>
    </div>
  )
}

export default GameResult;