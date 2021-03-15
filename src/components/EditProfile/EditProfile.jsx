import { Link } from "react-router-dom";

function EditProfile() {

  return (
    <div>
      <h1>Edit your profile</h1>
      <Link className="navLink" to='/homepAge'>Save</Link>
      <Link className="navLink" to='/homepAge'>Cancel</Link>
    </div>
  )
}

export default EditProfile;