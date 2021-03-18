import { Link } from "react-router-dom";
import {useSelector} from 'react-redux';


function EditProfile() {

  const user = useSelector((store) => store.user);

  let userEdit = false;

  const renderEditField = () => {
    if (userEdit == false) {
      return 
      <div>
        {user.username}
        <button onClick={changeUsername}>Change username</button>
      </div>
    } else {
      return <input type="test" defaultValue={user.username}></input>
    }
  }

  const changeUsername = () => {
    console.log('change username')
    userEdit = true;
  }

  return (
    <div>
      <h1>Edit your profile</h1>
      <div>{renderEditField}</div>
      <Link className="navLink" to='/homePage'>Save</Link>
      <Link className="navLink" to='/homePage'>Cancel</Link>
    </div>
  )
}

export default EditProfile;