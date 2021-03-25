import React from 'react';
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import Swal from 'sweetalert2';

function EditProfile() {

  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  // hole state for edit view status
  const [changeUserNameView, setChangeUserNameView] = useState('')
  // hold new username input
  const [newUserName, setNewUserName] = useState(user.username);

  // change view to edit
  const handleEditButton = () => {
    setChangeUserNameView('edit')
  }

  // cancel edit view and change back to normal view
  const handleCancel = () => {
    setChangeUserNameView('');
  }

  // save new username to DB
  const handleSave = () => {
    // dispatch new username to saga
    dispatch({
      // sends to userName saga
      type: 'CHANGE_USERNAME',
      payload: {
        newUserName: newUserName,
        userId: user.id
      }
    })
    // go back to normal view after changing username
    setChangeUserNameView('');
  }

  // delete user profile, user's friends, and user's match history
  const deleteButton = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Once deleted you will no longer have access to this site and all your info will be lost",
      icon: "warning",
      confirmButtonText: 'Yes!',
      showCancelButton: true,

    })
    .then((result) => {
      if (result.value) { 
        Swal.fire({
          title: "profile deleted",
          icon: "success",
        })
        dispatch({
          type: 'DELETE_PROFILE',
        })
        history.push('/homePage');
      } else {
        Swal.fire("Profile not deleted");
      }
  })
  }

  // Edit view
switch(changeUserNameView) {
  case 'edit':
    return (
      <div>
        <h1>Edit your profile</h1>
        <label htmlFor="editUserName">Change username</label>
        <input 
          type="text" 
          id="editUserName" 
          defaultValue={newUserName} 
          onChange={(event) => setNewUserName(event.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
      </div>
    )
    default:
        return (
      <div>
        <h1>Edit your profile</h1> <div>
          {newUserName}
          <button onClick={handleEditButton}>Change username</button>
        </div>
        <button onClick={deleteButton}>Delete profile</button>

        <Link className="navLink" to='/homePage'>Cancel</Link>
      </div>
    )
}
}

export default EditProfile;