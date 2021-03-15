import { Link } from "react-router-dom";
function SearchPage() {

  return (
    <div>
      <h3>Search for a course</h3>
      <Link className="navLink" to='/searchResults'>Search</Link>
    </div>
  )
}

export default SearchPage;