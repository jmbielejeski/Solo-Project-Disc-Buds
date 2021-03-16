import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';


function FriendsList() {

  const history = useHistory();
  const dispatch = useDispatch();

  const friendList = useSelector(store => store.friendListReducer)

  const [friendSearch, setFriendSearch] = useState('');

  useEffect(() => {
    dispatch({
      type: 'FETCH_FRIEND_LIST'
    })
  }, [])

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
      <ul>
        {friendList.map(friend => {
          return(
            <li key={friend.id}>{friend.username}</li>
          )
        })}
      </ul>
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