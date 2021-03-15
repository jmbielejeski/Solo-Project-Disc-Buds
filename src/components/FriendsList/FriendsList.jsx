import { Link } from "react-router-dom";
import {useDispatch} from 'react-redux';
import { useState, useEffect } from 'react';

function FriendsList() {

  const [search, setSearch] = useState('');

  const dispatch = useDispatch();

  const getSearchResults = (event) => {
    event.prevent();
    dispatchEvent({
      type: 'FETCH_FRIEND_SEARCH'
    })
  }
  
  return (
    <div>
      <h2>List of friends</h2>
      <form onSubmit={getSearchResults}>
        <input 
          type="text"
          onChange={(event) => setSearch(event.target.value)}
        />  
        <Link className="navLink" to="/friendsSearchResults">Search</Link>
      </form>
    </div>
  )
}

export default FriendsList;