import { Link } from "react-router-dom";

function SelectFriend() {

  return (
    <div>
      <h3>Select a friend</h3>
      <Link className="navLink" to='/gameProgress'>Start Game</Link>
    </div>
  )
}

export default SelectFriend;