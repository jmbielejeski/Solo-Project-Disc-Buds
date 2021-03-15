import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import {useDispatch} from 'react-redux';


function FriendsSearchResults() {

  const dispatch = useDispatch();

  const friendSearch = useSelector(store => store.friendReducer);

  useEffect(() =>{
    dispatch({
      type: 'FETCH_FRIEND_SEARCH'
    })
  }, [])

  return (
    <div>
      <h3>Friend Search Results</h3>
      <ul>
        {friendSearch.map(friend => {
          return(
            <li key={friend.id}>{friend.username}</li>
          )
        })}
      </ul>
      <Link className="navLink" to='/friendsList'>Back</Link>
    </div>
  )
}

export default FriendsSearchResults;