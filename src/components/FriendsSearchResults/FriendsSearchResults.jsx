import React from 'react';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import swal from 'sweetalert';

function FriendsSearchResults() {

  const dispatch = useDispatch();

  // store friend search from reducer
  const friendSearch = useSelector(store => store.friendReducer);

  // grab friend search results on load
  useEffect(() =>{
    dispatch({
      type: 'FETCH_FRIEND_SEARCH'
    })
  }, [])

  // Add a friend relationship to the DB
  const addFriend = (userId) => {
    console.log('userId', userId);
    dispatch({
      type: 'ADD_FRIEND',
      payload: {
        userId
      }
    })
    swal({
      title: "Friend Added"
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