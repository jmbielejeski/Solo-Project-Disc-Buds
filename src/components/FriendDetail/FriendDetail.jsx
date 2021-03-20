import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Swal from 'sweetalert2'

function FriendDetail() {

  const history = useHistory();
  const dispatch = useDispatch();

  // // store current friend in local state
  // const [currentFriend, setCurrentFriend] = useState('');

  // grab friend details from reducer
  const friendDetails = useSelector(store => store.friendDetailReducer);

  // on load grab friend details
  useEffect(() => {
    dispatch({
      type: 'GRAB_FRIEND_DETAILS'
    })
  }, [])

  //console.log('currentFriend', friendDetails)

  // navigates back to friends list
  const goBack = () => {
    history.push('/friendsList');
  }

  // deletes friend relationship from database
  const handleDelete = (friendId) => {
    console.log('friendId', friendId);
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted you will no longer be able to play against this friend",
      icon: "warning",
      confirmButtonText: 'Yes!',
      dangerMode: true,
      showCancelButton: true,

    })
    .then((result) => {
      if (result.value) { 
        Swal.fire({
          title: "friend deleted",
          icon: "success",
        })
        dispatch({
          type: 'DELETE_FRIEND',
          payload: {
            friendId
          }
        })
        // after deleting friend goes back to friend list view
        history.push('/friendsList');
      } else {
        Swal.fire("Friend not deleted");
      }
  })
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