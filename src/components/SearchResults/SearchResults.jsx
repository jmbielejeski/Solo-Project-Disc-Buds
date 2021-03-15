import { Link } from "react-router-dom";

function SearchResults() {


  return(
    <div>
      <h5>Search results for ''</h5>
      
      <Link className="navLink" to='/selectFriend'>Continue</Link>
    </div>

  )
}

export default SearchResults;