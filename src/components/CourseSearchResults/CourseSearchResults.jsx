import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';


function CourseSearchResults() {

  const courseSearchResults = useSelector(store => store.courseSearchReducer);
  return(
    <div>
      <h5>Search results for ''</h5>
      <ul>
        {courseSearchResults.map(course => {
          return (
            <li key={course.id}>{course.course_name}</li>
          )
        })}
      </ul>
      <Link className="navLink" to='/selectFriend'>Continue</Link>
    </div>

  )
}

export default CourseSearchResults;