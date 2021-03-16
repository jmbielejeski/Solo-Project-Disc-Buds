import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

function FriendDetail() {

  const history = useHistory();

  const friendDetails = useSelector(store => store.friendDetailReducer);

  console.log('friendDetails', friendDetails[0])

  const goBack = () => {
    history.push('/friendsList');
  }

  return (
    <div>
      <h1>Friend Detail</h1>
      <h4>{friendDetails[0].username}</h4>
      <button onClick={goBack}>Back</button>
    </div>
  )
}

export default FriendDetail;