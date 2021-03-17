import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

function FriendDetail() {

  const history = useHistory();

  const dispatch = useDispatch();

  const friendDetails = useSelector(store => store.friendDetailReducer);

  console.log('friendDetails', friendDetails[0])

  const goBack = () => {
    history.push('/friendsList');
  }

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
      <h1>Friend Detail</h1>
      <div>{friendDetails[0].username}
        <button onClick={() => handleDelete(friendDetails[0].id)}>Delete</button>
      </div>
      <button onClick={goBack}>Back</button>
    </div>
  )
}

export default FriendDetail;