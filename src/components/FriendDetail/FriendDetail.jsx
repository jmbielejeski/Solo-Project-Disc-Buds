import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';

function FriendDetail() {

  const history = useHistory();
  const dispatch = useDispatch();

  const [currentFriend, setCurrentFriend] = useState('');

  const friendDetails = useSelector(store => store.friendDetailReducer);

  useEffect(() => {
    dispatch({
      type: 'GRAB_FRIEND_DETAILS'
    })
  }, [])

  console.log('currentFriend', friendDetails)

  // navigates back to friends list
  const goBack = () => {
    history.push('/friendsList');
  }

  // deletes friend relationship from database
  const handleDelete = (friendId) => {
    console.log('friendId', friendId);
    dispatch({
      type: 'DELETE_FRIEND',
      payload: {
        friendId
      }
    })
    history.push('/friendsList');
  }

  return (
    <div>
      <h4>Friend Details</h4>
      <div>{friendDetails.friendUsername}
        <button onClick={() => handleDelete(friendDetails.friendId)}>Delete</button>
      </div>
      <button onClick={goBack}>Back</button>
    </div>
  )
}

export default FriendDetail;