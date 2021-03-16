import {useDispatch} from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


function FriendsList() {

  const history = useHistory();
  const dispatch = useDispatch();

  const [friendSearch, setFriendSearch] = useState('');

  const getSearchResults = (event) => {
    event.preventDefault();
    console.log('freindSearch', friendSearch)
    dispatch({
      type: 'FETCH_FRIEND_SEARCH',
      payload: {
        friendSearch,
      }
    })
    history.push('/friendsSearchResults')
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