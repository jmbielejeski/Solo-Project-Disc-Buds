import { SquareFootOutlined } from '@material-ui/icons';
import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2'

function GameResult() {

  const matchResults = useSelector(store => store.matchResultsReducer);

  console.log('matchResults', matchResults);

  if (matchResults.yourScore < matchResults.friendScore) {
    Swal.fire({
      title: 'Results',
      text: `You won!`
    })
  } else if (matchResults.yourScore > matchResults.friendScore) {
    Swal.fire({
      title: 'Results',
      text: `${matchResults.friend} won!`
    })
  } else {
    Swal.fire({
      title: 'Results',
      text: `It's a tie!`
    })
  }

  return (
    <div>
      <h2>Game Results!</h2>
      <h4>your score: {matchResults.yourScore}</h4>
      <h4>{matchResults.friend}'s score: {matchResults.friendScore}</h4>
      <Link className="navLink" to='/homePage'>Home page</Link>

    </div>
  )
}

export default GameResult;