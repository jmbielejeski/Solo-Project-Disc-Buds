import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';

function EditProfile() {

  const dispatch = useDispatch();

  const user = useSelector((store) => store.user);

  const [editView, setEditView] = useState('')
  const [newUserName, setNewUserName] = useState(user.username);


  const handleEditButton = () => {
    setEditView('edit')
  }

  const handleCancel = () => {
    setEditView('');
  }

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
    setEditView('');
  }

switch(editView) {
  case 'edit':
    return (
      <div>
        <h1>Edit your profile</h1>
        <label for="editUserName">Change username</label>
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
        <Link className="navLink" to='/homePage'>Cancel</Link>
      </div>
    )
}
}

export default EditProfile;