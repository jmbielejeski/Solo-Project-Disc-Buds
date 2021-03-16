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

  const addFriend = (userId) => {
    console.log('userId', userId);
    dispatch({
      type: 'ADD_FRIEND',
      payload: {
        userId
      }
    })
  }

  return (
    <div>
      <h3>Friend Search Results</h3>
      <ul>
        {friendSearch.map(friend => {
          return(
            <li key={friend.id}>{friend.username} 
              <button onClick={() => addFriend(friend.id)}>Add Friend</button>
            </li>            
          )
        })}
      </ul>
      <Link className="navLink" to='/friendsList'>Back</Link>
    </div>
  )
}

export default FriendsSearchResults;