import React from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import DropzoneS3Uploader from '../DropzoneS3Uploader/DropzoneS3Uploader';

function EditProfile() {

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  // hole state for edit view status
  const [editView, setEditView] = useState('')
  // hold new username input
  const [newUserName, setNewUserName] = useState(user.username);

  // change view to edit
  const handleEditButton = () => {
    setEditView('edit')
  }

  // cancel edit view and change back to normal view
  const handleCancel = () => {
    setEditView('');
  }

  // save new username to DB
  const handleSave = () => {
    console.log('handleSave', newUserName)
    // dispatch new username to saga
    dispatch({
      type: 'CHANGE_USERNAME',
      payload: {
        newUserName: newUserName,
        userId: user.id
      }
    })
    // go back to normal view after changing username
    setEditView('');
  }

switch(editView) {
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
        <DropzoneS3Uploader />
      </div>
    )
    default:
        return (
      <div>
        <h1>Edit your profile</h1> <div>
          {newUserName}
          <button onClick={handleEditButton}>Change username</button>
        </div>
        <Link className="navLink" to='/homePage'>Cancel</Link>
      </div>
    )
}
}

export default EditProfile;