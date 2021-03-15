import {useDispatch} from 'react-redux';
import { useState, useEffect } from 'react';

function FriendsList() {

  const [friendSearch, setFriendSearch] = useState('');

  const dispatch = useDispatch();

  const getSearchResults = (event) => {
    event.prevent();
    dispatch({
      type: 'FETCH_FRIEND_SEARCH',
      payload: friendSearch
    })
  }

  return (
    <div>
      <h2>List of friends</h2>
      <form onSubmit={getSearchResults}>
        <input 
          type="text"
          name="search"
          placeholder="Search for friend"
          value={friendSearch}
          onChange={(event) => setFriendSearch(event.target.value)}
        />  
        <button>Search</button>
      </form>
    </div>
  )
}

export default FriendsList;