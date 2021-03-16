import { Link } from "react-router-dom";

function EditProfile() {

  return (
    <div>
      <h1>Edit your profile</h1>
      <Link className="navLink" to='/homePage'>Save</Link>
      <Link className="navLink" to='/homePage'>Cancel</Link>
    </div>
  )
}

export default EditProfile;